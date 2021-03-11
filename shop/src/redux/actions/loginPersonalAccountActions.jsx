export const loginPersonalAccountActions = {
  ENTER: 'enter',
  LOGIN: 'login / change password',
  ENTEREMAIL: 'enter email',
  AUTOCOMPLETE: 'autocomplete user information',
  ADDPHOTO: 'add photo',
};

export const ENTER = {
  type: loginPersonalAccountActions.ENTER,
  loginIsVisible: true,
  personAccountIsVisible: false,
};

export const LOGIN = {
  type: loginPersonalAccountActions.LOGIN,
  loginFormIsVisible: true,
  loginFormLoginPageIsVisible: true,
  loginFormForgetPasswordIsVisible: false,
};

export const ENTEREMAIL = {
  type: loginPersonalAccountActions.ENTEREMAIL,
  clientEmail: '',
};

export const AUTOCOMPLETE = {
  type: loginPersonalAccountActions.AUTOCOMPLETE,
  firstName: '',
  phone: '',
  address: '',
};

export const ADDPHOTO = {
  type: loginPersonalAccountActions.ADDPHOTO,
  photo: '',
};
