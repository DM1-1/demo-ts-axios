export default [
  // 用户登录
  {
    url: "/api/user/login",
    method: "post",
    response: (res) => {
      return {
        code: 200,
        message: 'success',
        data: {
          token: "Token"
        }
      }
    }
  },
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: ({headers}) => {
      if(headers['authorization'] === 'Bearer Token') {
        return {
          code: 200,
          message: 'success',
          data: {
            id: "114514",
            username: "DM",
            avatar: "https://p3-passport.byteimg.com/img/user-avatar/3745b7eb198f2357155cd88eb7930f35~180x180.awebp",
          }
        }
      } else {
        return {
          code: 401, 
          message: 'Unauthorized',
          data: null
        }
      }
    }
  },
  // 一个失败的请求
  {
    url: "/api/error",
    method: "get",
    response: (res) => {
      return {
        code: 1,
        message: '密码错误',
        data: null
      }
    }
  }
]
