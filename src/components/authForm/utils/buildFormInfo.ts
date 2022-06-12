import { UserForm } from "api/user";
import { store } from "store";
import { register, login } from "store/slices/auth.slice";
import { FormType } from "../index";

export const buildFormInfo = (type: FormType) => {
  const isLogin = type === 'login'

  const dispatch = async (data: UserForm) => {
    return store.dispatch(isLogin ? login(data) : register(data))
  }

  return ({
    successMessage: isLogin ? '登录成功,等待跳转至首页!' : '注册成功,等待跳转至首页!',
    title: isLogin ? '用户登录' : '用户注册',
    linkText: isLogin ? '去注册' : '去登录',
    link: isLogin ? '/register' : '/login',
    buttonText: isLogin ? '登录' : '注册',
    successLink: '/',
    dispatch
  })
}
