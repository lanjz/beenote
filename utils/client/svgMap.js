function cSvgDom() {
    const svgDom = document.createElementNS('http://www.w3.org/2000/svg','svg');
    // svgDom.setAttribute('width','2000');
    // svgDom.setAttribute('height','2000');
    svgDom.setAttribute('version','full');
    svgDom.setAttribute('baseProfile','baseProfile');
    svgDom.setAttribute('style', `background: #272b2d`)
    svgDom.setAttribute('xmlns','http://www.w3.org/2000/svg');
    return svgDom
}
// 创建SVG-文本元素
function cText(txt, attr = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg','text');
    attr = {
        dominantBaseline: 'middle',
        fill: attr.type === 'text' ? '#fff' : '#333',
        ...attr
    }
    Object.keys(attr).forEach(item => {
        el.setAttribute(item, attr[item]);
    })
    el.textContent = txt
    return el
}
// 创建SVG-元素
function cEl(tag, attr) {
    attr = {
        fill: '#000',
        ...attr,
    }
    const el = document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.keys(attr).forEach(item => {
        el.setAttribute(item, attr[item]);
    })
    return el
}
// 创建组
function createGroup(attr = {}) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    Object.keys(attr).forEach(item => {
        g.setAttribute(item, attr[item]);
    })
    return document.createElementNS('http://www.w3.org/2000/svg', 'g')
}
// ----------------- //
function SvgMap(data, options = {}) {
    console.log('data', data)
    console.log('options', options)
    if(!data || !data[options.root] || !data[options.root].childNodes.length){
        console.warn('请确定子元素')
        return
    }
}
SvgMap.prototype.initState = function(data, options = {}) {
    this.data = JSON.parse(JSON.stringify(data))
    this.rootData = this.data[options.root]
    this.direction = options.direction|| '' // right->只向右伸展 '' => 左右伸展
    this.virtualSvg = {}
    this.reactStyle = { // 文本样式
        textPadding: 10, // 文字与边框的间距
        verticalMargin: 20, // 元素上下间距
        rowMargin: 40, // 元素左右间距
        minWidth: 50, // 元素最小宽度
        reactRadius: 5, // 元素圆角
    }
    this.lineStyle = { // 线条样式
        style: 'stroke:#fff',
        'stroke-width': 1,
        stroke: '#fff',
        fill: 'transparent'
    }
    this.keyName = options.key || 'name'
    this.lableName = options.name || 'name'
    this.callback = options.callback || null

}
SvgMap.prototype.init = function (data, options) {

    this.initState(data, options)
    this.svgDom = cSvgDom()
    this.svgGroup = createGroup()
    this.svgDom.appendChild(this.svgGroup)
    document.body.appendChild(this.svgDom)
    const child = this.rootData.childNodes || []
    let childLeft = null
    if(!this.direction && child.length > 1){
        const half = Math.floor(child.length/2)
        const left = child.splice(0, half) // splice会改变原数组，一半存入left中，child只存在其余部分了
        childLeft = this.initWalk(left, 'left')
        this.svgGroup.appendChild(childLeft)
    }
    const childRight = this.initWalk(child)
    this.svgGroup.appendChild(childRight)
    this.addEvent()
    this.createRootG(childRight, childLeft)
    const { width: svgW, height: svgH } = this.svgGroup.getBBox()
    this.svgDom.setAttribute('width', svgW)
    this.svgDom.setAttribute('height', svgH)
    this.svgDom.remove()
    return this.svgDom
}
// 处理根元素
SvgMap.prototype.initWalk = function(tree, direction) {
    const gGroup = this.walk(tree, direction)
    return gGroup
}
SvgMap.prototype.walk = function (tree, direction) {
    const svgElArr = []
    let hei = 0 // 设置每个元素的偏移高度
    tree.forEach((item) => {
        let svgEl = this.cReact(
            { text: item[this.lableName] },
            { y: hei, fill: item.type === 'text' ? 'transparent' : '#a3c6c0' },
            { direction,hasChild: this.data[item.fullPath].childNodes&&this.data[item.fullPath].childNodes.length,key: item[this.keyName], type: item.type || '' }
        ) // 返回某个文本G
        if(this.data[item.fullPath].childNodes && this.data[item.fullPath].childNodes.length) { // 如果有子节点，则递归子节点后再与当前节点合并成一个大组
            const childSvgEl  = this.walk(this.data[item.fullPath].childNodes, direction)
            svgEl = this.combineGroup(svgEl, childSvgEl, item)
        }
        hei += ((this.getRect(svgEl)).height + this.reactStyle.verticalMargin)
        svgElArr.push(svgEl)
        this.addVirtualSvg(item)
    })
    return this.createListGroup(svgElArr) // 返回组成G
}
SvgMap.prototype.addVirtualSvg = function(node, childDom) {
    if(!this.virtualSvg[node[this.keyName]]){
        this.virtualSvg[node[this.keyName]] = {
            ...node,
            childDom: []
        }
    }
    if(childDom) {
        this.virtualSvg[node[this.keyName]].childDom.push(childDom)
    }
}
SvgMap.prototype.addEvent = function(){
    const _this = this
    this.svgDom.addEventListener('click', function (e) {
        const key = e.target.getAttribute('key') || ''
        if(e.target.tagName === 'circle') {
            _this.virtualSvg[key].hide = !_this.virtualSvg[key].hide
            _this.virtualSvg[key].childDom.forEach(item => {
                item.style.display = _this.virtualSvg[key].hide ? 'none' : 'block'
            })
            e.target.style.opacity = _this.virtualSvg[key].hide ? '.5' : '1'
        } else if(e.target.tagName === 'rect' || e.target.tagName === 'text'){
            _this.callback && _this.callback(_this.virtualSvg[key])
        }
    })
}
/**
 * 获取元素几何信息，需要在DOM才能得到这些信息，所以先执行appendChild
 * 要注意appendChild后修改节点位置，所以切勿在插入到正确位置后再执行这个方法
 * */
SvgMap.prototype.getRect = function(g){
    this.svgGroup.appendChild(g)
    return g.getBBox()
}

/**
 *  获取子元素集合中的垂直居中位置
 *  g元素没有记录几何信息
 *  通过查找g元素下的非g元素，来获取当前g的垂直偏移量
 * */
SvgMap.prototype.findMiddlePosition =function(el){
    const firstEl = el.firstChild
    const {y: firstElY} = this.findPositionElY(firstEl)
    const lastEl = el.lastChild
    const {y: lastElY} = this.findPositionElY(lastEl)
    const result = (lastElY - firstElY*1) / 2 + firstElY*1
    return result
}
// 获取某在元素在的Y偏移量
SvgMap.prototype.findPositionElY = function(el){
    while (el.tagName === 'g'){
        el = el.firstChild
    }
    return {
        y: el.getAttribute('y'),
        x: el.getAttribute('x'),
        width: el.getAttribute('width'),
        height: el.getAttribute('height'),
    }
}

/**
 * @params {g} right
 * @params {g} left 如果没有说明只有一侧
 * */
SvgMap.prototype.createRootG = function(right, left){
    this.addVirtualSvg(this.rootData)
    const rightMiddleY = this.findMiddlePosition(right)
    const leftMiddleY = left ? this.findMiddlePosition(left) : 0
    // 中心按钮的X偏移量：如果有left就放在left右侧
    const rootX = left ? left.getBBox().width + this.reactStyle.rowMargin : this.reactStyle.rowMargin
    // 计算高的那个中间值
    const rootY = Math.max(rightMiddleY, leftMiddleY)
    const fontStyle = `font-size: 18px;`
    const rootG = this.cReact(
        { text: this.rootData[this.lableName], style: fontStyle },
        { y: rootY, x: rootX, fill: '#eade98', rx: 20, ry: 20 },
        { key: this.rootData[this.keyName] }
        )
    this.svgDom.appendChild(rootG)
    const rootBox = rootG.getBBox()
    // 矮的那个也要放在高的垂直居中位置（当存在left时才需要计算）
    const minEl = left && (leftMiddleY <= rightMiddleY) ? left : right
    const rightY = left ? rootY - this.findMiddlePosition(minEl) : 0
    if(minEl === left) {
        // 水平翻转
        left.setAttribute('style', `transform: translate(${left.getBBox().width}px, ${rightY}px) rotateY(180deg)`)
        right.setAttribute('transform', `translate(${Number(rootBox.x)+Number(rootBox.width)+this.reactStyle.rowMargin}, 0)`)
    } else {
        left.setAttribute('style', `transform: translate(${left.getBBox().width}px, 0) rotateY(180deg)`)
        right.setAttribute('transform', `translate(${Number(rootBox.x)+Number(rootBox.width)+this.reactStyle.rowMargin}, ${rightY})`)
    }
    this.drawLine(rootG, right, left, minEl, rightY)
}

/**
 * 创建SVG-ellipse元素
 * @params {Object} textOptions: 文字相关的配置
 * @params {Number} height: 垂直偏移量
 * @params {Object} config: 其它属性
 * */
SvgMap.prototype.cReact = function(textOptions, rectOptions = {}, config) {
    const {text, ...txtOpt} = textOptions
    const {direction, key, ...conf} = config
    const { textPadding, reactRadius, minWidth } = this.reactStyle
    const cG = createGroup()
    let sText = cText(text,{y: rectOptions.y || 0, x: rectOptions.x || 0, key,  ...txtOpt, ...conf})
    cG.appendChild(sText)
    const {width, height} = this.getRect(cG)
    sText.setAttribute('transform', `translate(${textPadding}, ${height})`);// 默认情况文本向偏上，不能垂直居中，所以纠正一下
    const attr = {
        x: 0,
        y: 0,
        width: Math.max((width + textPadding * 2), minWidth),
        height: height + textPadding,
        rx: reactRadius,
        ry: reactRadius,
        key,
        ...rectOptions,
        ...conf
    }
    const sEllipse = cEl('rect', attr)
    if(config.type === 'text') {
        sText.setAttribute('transform', `translate(${textPadding}, ${height/2})`);// 默认情况文本向偏上，不能垂直居中，所以纠正一下
        const underLine = cEl('line', {
            x1: rectOptions.x || 0,
            y1: (rectOptions.y || 0) + this.getRect(sEllipse).height/2,
            x2: width + textPadding * 2,
            y2: (rectOptions.y || 0) + this.getRect(sEllipse).height/2,
            'stroke-width': 1,
            stroke: '#fff'
        })
        cG.appendChild(underLine)
    } else if(config.hasChild){
        const circle = cEl('circle', {
            cx: direction === 'left' ? (rectOptions.x || 0) - 5:(rectOptions.x || 0) + this.getRect(sEllipse).width+5,
            cy: (rectOptions.y || 0) + this.getRect(sEllipse).height/2,
            r: 5,
            fill: '#fff',
            'stroke-width': 1,
            key
        })
        cG.appendChild(circle)
    }
    cG.prepend(sEllipse)
    if(direction === 'left'){
        cG.setAttribute('style', `transform: translateX(${Math.max((width + textPadding * 2), minWidth)}px) rotateY(180deg)`)
    }
    return cG
}
/**
 * @params {svg[g]} a 左侧的g元素
 * @params {svg[g]} b a对应的子元素
 * */
SvgMap.prototype.combineGroup = function(a, b, node) {
    const cG = createGroup()
    const x = `${this.getRect(a).width + this.reactStyle.rowMargin}` // 计算a,b的间距
    const y = this.findMiddlePosition(b) // 计算a在b垂直方向的中间位置
    const {y: aY, width: aWidth, height: aHeight } = this.getRect(a) // 当前A的几何信息
    b.setAttribute('transform', `translate(${x}, ${aY})`) // b的整体Y偏移要与a元素保持一致
    a.childNodes.forEach(node => {
        if(node.tagName === 'circle') {
            node.setAttribute('cy', y+aY + aHeight/2) // （步骤A）相对b的居中位置 + 原本的偏移量
        } else {
            node.setAttribute('y', y+aY) // （步骤A）相对b的居中位置 + 原本的偏移量
        }
    })

    cG.appendChild(a)
    cG.appendChild(b)
    this.addVirtualSvg(node, b)
    // 画线
    b.childNodes.forEach(item => {
        const {y: positionY, height} = this.findPositionElY(item) // 获取元素在当前组内的Y偏移量
        const M = `${aWidth} ${(aY + y) + aHeight/2}`
        const C1 = `${aWidth+20} ${(aY + y) + aHeight/2}`
        const C2 = `${x-20} ${Number(positionY) + Number(aY)+height/2}`
        const E = `${x} ${Number(positionY) + Number(aY)+height/2}`
        const line = cEl('path', {
            d: `M${M} C ${C1} ${C2} ${E}`,
            ...this.lineStyle
        })
        this.virtualSvg[node[this.keyName]].childDom.push(line)
        cG.appendChild(line)
    })
    return cG
}
// 将同父的元素放同一个组中
SvgMap.prototype.createListGroup = function(svgElArr) {
    const cG = createGroup()
    svgElArr.forEach((item, ind) => {
        cG.appendChild(item)
    })
    return cG
}

SvgMap.prototype.drawLine = function(root, right, left, minEl, rightY = 0) {
    const { x: rootX, y: rootY, width: rootW, height: rootH } = root.getBBox()
    const rootCenterX = Number(rootX) + Number(rootW) / 2
    const rootCenterY = Number(rootY) + Number(rootH) / 2
    const M = `${rootCenterX} ${rootCenterY}`
    if(left) {
        left.childNodes.forEach(item => {
            const {y: itemY, height} = this.findPositionElY(item)
            const targetX = Number(rootX) - this.reactStyle.rowMargin
            const targetY = Number(itemY) + Number(height) / 2 + ((minEl === left) ? rightY : 0)
            const Q = `${rootCenterX} ${targetY}`
            const E = `${targetX} ${targetY}`
            const line = cEl('path', {
                d: `M${M} Q ${Q} ${E}`,
                ...this.lineStyle
            })
            this.svgGroup.appendChild(line)
        })
    }
    right.childNodes.forEach(item => {
        const {y: itemY, height} = this.findPositionElY(item)
        const targetX = Number(rootX) +this.reactStyle.rowMargin + rootW
        const targetY = Number(itemY) + Number(height) / 2 + ((minEl === right) ? rightY : 0)
        const Q = `${rootCenterX} ${targetY}`
        const E = `${targetX} ${targetY}`
        const line = cEl('path', {
            d: `M${M} Q ${Q} ${E}`,
            ...this.lineStyle
        })
        this.svgGroup.appendChild(line)
    })
}

export default function mapSvg(data, options) {
    return (new SvgMap(data, options)).init(data, options)
}
