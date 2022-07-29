export enum ResponseErrorType {
  /** ********************** 通用 ********************** **/
  SUCCESS = 'SUCCESS',

  /** ********************** 用户模块 ********************** **/
  USER_EXIST = 'USER_EXIST',

  EMAIL_EXIST = 'EMAIL_EXIST',

  USER_OR_PASSWORD_ERROR = 'USER_OR_PASSWORD_ERROR',

  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

export const ResponseErrorMsgMapping = new Map<
  ResponseErrorType,
  { message: string; code: number }
>([
  [ResponseErrorType.SUCCESS, { message: '请求成功', code: 0 }],

  [ResponseErrorType.USER_EXIST, { message: '用户已存在', code: 1001 }],
  [ResponseErrorType.EMAIL_EXIST, { message: '邮箱已存在', code: 1002 }],
  [
    ResponseErrorType.USER_OR_PASSWORD_ERROR,
    { message: '用户名或密码错误', code: 1003 },
  ],
  [
    ResponseErrorType.TOKEN_EXPIRED,
    { message: '身份验证失败，请重新登录', code: 1004 },
  ],
]);
