// 一般返回值类型
export interface Res {
  /**
   * 错误
   * @type { null | Error }
   */
  err: null | Error;
  /**
   * 返回值
   * @type { string | number | Array<any> | object }
   */
  data: string | number | Array<any> | object;
}

// 错误类型
export interface iError extends Error {
  /**
   * 状态码
   * @type { number }
   */
  code?: number;
  /**
   * 出现错误的对象
   * @type { string }
   */
  stringValue?: string
}
