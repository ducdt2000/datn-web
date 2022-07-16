import {
  UpdateUser,
  CreateUser,
  LoginInput,
  RegisterInput,
  ChangePasswordInput,
  ForgetPasswordInput,
  VerifyForgetPasswordTokenInput,
  ResetPasswordInput,
} from '@ts-types/generated';
import http from '@utils/api/http';
import Base from './base';

class User extends Base<CreateUser, UpdateUser> {
  me = async (url: string) => {
    return this.http(url, 'get');
  };

  login = async (url: string, variables: LoginInput) => {
    return this.http<LoginInput>(url, 'post', variables);
  };

  logout = async (url: string) => {
    return http.post(url);
  };

  register = async (url: string, variables: RegisterInput) => {
    return this.http<RegisterInput>(url, 'post', variables);
  };

  changePassword = async (url: string, variables: ChangePasswordInput) => {
    return this.http<ChangePasswordInput>(url, 'post', variables);
  };

  forgetPassword = async (url: string, variables: ForgetPasswordInput) => {
    return this.http<ForgetPasswordInput>(url, 'post', variables);
  };

  verifyForgetPasswordToken = async (
    url: string,
    variables: VerifyForgetPasswordTokenInput
  ) => {
    return this.http<VerifyForgetPasswordTokenInput>(url, 'post', variables);
  };

  resetPassword = async (url: string, variables: ResetPasswordInput) => {
    return this.http<ResetPasswordInput>(url, 'post', variables);
  };

  lock = async (url: string, variables: { userId: string }) => {
    return this.http<{ userId: string }>(url, 'post', variables);
  };

  unlock = async (url: string, variables: { userId: string }) => {
    return this.http<{ userId: string }>(url, 'post', variables);
  };
}

export default new User();
