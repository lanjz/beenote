const path = require('path')
const fs = require('fs')
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')

let lastHash = '' // 记录文件是否修改，如果发生变化才发送备份数据

const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '156081289@qq.com',
    pass: 'llqeqqsaitjcbieh'
  }
})

function sendMsg(file) {
  const mailOptions = {
    from: '156081289@qq.com', // 发送者
    to: '3133004535@qq.com', // 接受者,可以同时发送多个,以逗号隔开
    subject: '数据备份', // 标题
    //text: 'Hello world', // 文本
    html: '<h2>数据备份</h2>',
    attachments:[
      {
        filename : path.basename(file),
        path: file
      }
    ]
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('发送成功')
  })
}

function getSendFilePath() {
  const isWin = /^win/.test(process.platform)
  const basePath = isWin ? 'D:\\Project' : '/data'
  const backupNowPath = path.join(basePath, 'backup', 'mongod_bak_now')
  const backupListPath = path.join(basePath, 'backup', 'mongod_bak_list')
  const findBackupName = fs.readdirSync(backupNowPath)
  const sendFileName = path.join(backupListPath, ` mongod_bak_${findBackupName[0]}.tar.gz`)
  return sendFileName
}


function createFileHash256(path) {
  //从文件创建一个可读流
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path);
    const fsHash = crypto.createHash('sha256');
    
    stream.on('data', function (d) {
      fsHash.update(d);
    });
    
    stream.on('end', function () {
      const md5 = fsHash.digest('hex');
      resolve(md5);
    });
  })
}

async function todoSend() {
  try{
    const sendFilePath = getSendFilePath()
    const curHash = await createFileHash256(sendFilePath)
    console.log('curHash', curHash)
    if(curHash === lastHash) return
    lastHash = curHash
    sendMsg(sendFilePath)
  } catch (e) {
    console.log('邮件发送失败', e)
  }
}

let j = ''
function initSchedule() {
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 3;
  rule.minute = 0;
  if(!j) {
    schedule.scheduleJob(rule, function(){
      todoSend()
    });
  }
}

sendMsg()

module.exports = {
  initSchedule
}
