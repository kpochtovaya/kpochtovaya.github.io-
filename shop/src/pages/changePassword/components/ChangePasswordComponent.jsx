import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ConnectedHeader from '../../main/header/container/HeaderContainer';
import Footer from '../../main/footer/components/FooterComponent';
import setErrorNotNull from '../../../common/untils/setErrorNotNull';
import setErrorIncorrectLength from '../../../common/untils/setErrorIncorrectLength';
import InputWitchCkeckingNotNull from '../../../common/input/components/InputWitchCkeckingNotNullComponent';
import postChangePasswordRequest from '../api/post/postChangePasswordRequest';
import removeErrorNotNull from '../../../common/untils/removeErrorNotNull';
import removeErrorLength from '../../../common/untils/removeErrorLength';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    const { pages } = this.props;
    this.state = {
      clientEmail: pages.loginPersonalAccountReducer.clientEmail,
      clientEmailInput: 'emailChangePasswordInput',
      clientEmailSymbol: 'emailChangePasswordErrorSymbol',
      passwordNew: '',
      passwordNewInput: 'passwordNewInput',
      passwordNewSymbol: 'errorSymbolPasswordNew',
      passwordNewRepeat: '',
      passwordRepeatInput: 'passwordNewRepeatInput',
      passwordRepeatSymbol: 'errorSymbolPasswordNewRepeat',
      errorLength: 'errorlengthString',
    };
  }

  componentDidMount() {
    const { pages } = this.props;
    this.setState({
      clientEmail: pages.loginPersonalAccountReducer.clientEmail,
    });
  }

  componentDidUpdate(previousProps, previousState) {
    const { pages } = this.props;
    if (previousProps.pages.loginPersonalAccountReducer.clientEmail
      !== pages.loginPersonalAccountReducer.clientEmail) {
      this.updateEmail(pages.loginPersonalAccountReducer.clientEmail);
    }
  }

  updateData = (value, name) => {
    if (name === 'clientEmail') { this.setState({ clientEmail: value }); }
    if (name === 'passwordNew') { this.setState({ passwordNew: value }); }
    if (name === 'passwordNewRepeat') { this.setState({ passwordNewRepeat: value }); }
  }

  updateEmail = (value) => { this.setState({ clientEmail: value }); }

  render() {
    const {
      clientEmail, clientEmailInput, clientEmailSymbol,
      passwordNew, passwordNewInput, passwordNewSymbol,
      passwordNewRepeat, passwordRepeatInput, passwordRepeatSymbol, errorLength,
    } = this.state;
    const { history } = this.props;
    async function handleButtonClick() {
      const userNotFound = document.getElementById('notRealUser');
      const result = await postChangePasswordRequest(clientEmail, passwordNew, passwordNewRepeat);
      if (result === true) {
        history.push('/main-page');
      } if (result === 'incorrectUserOrPassword') {
        userNotFound.setAttribute('class', 'userNotFoundBlock');
      }
    }

    return (
      <>
        <ConnectedHeader linkItem={<button type="button" className="buttonBack">Главная</button>} link="/main-page" disabled={false} />
        <div className="changePassword-wrap">
          <h2> Смена пароля </h2>
          <form className="changePassword">
            <p id="notRealUser" className="userNotFoundBlock -disabled">Пользователя с таким email не существует</p>
            <div className="email">
              <p className="emailString -required">Email:</p>
              <InputWitchCkeckingNotNull
                initialValue={clientEmail}
                type="email"
                name="clientEmail"
                classInput={clientEmailInput}
                classSymbol={clientEmailSymbol}
                updateData={this.updateData}
                removeErrorNotNull={removeErrorNotNull}
              />
            </div>
            <div className="passwordNew">
              <p className="passwordNewString -required">Пароль:</p>
              <InputWitchCkeckingNotNull
                initialValue={passwordNew}
                type="password"
                name="passwordNew"
                classInput={passwordNewInput}
                classSymbol={passwordNewSymbol}
                updateData={this.updateData}
                removeErrorNotNull={removeErrorNotNull}
                removeErrorLength={removeErrorLength}
                classerrorLength={errorLength}
              />
              <p className={`${errorLength} -disabled`}>Пароль должен быть не менее 9 символов</p>
            </div>
            <div className="passwordNewRepeat">
              <p className="passwordNewRepeatString -required">Повторите пароль:</p>
              <InputWitchCkeckingNotNull
                initialValue={passwordNewRepeat}
                type="password"
                name="passwordNewRepeat"
                classInput={passwordRepeatInput}
                classSymbol={passwordRepeatSymbol}
                updateData={this.updateData}
                removeErrorNotNull={removeErrorNotNull}
              />
            </div>
            {(clientEmail && passwordNew && passwordNewRepeat)
            && (passwordNew === passwordNewRepeat) && (passwordNew.length >= 9) ? (
              <button
                type="button"
                className="changePasswordButton"
                onClick={() => handleButtonClick()}
              >
                Изменить пароль
              </button>
              ) : (
                <button
                  type="button"
                  className="changePasswordButton"
                  onClick={() => {
                    if (!clientEmail) {
                      setErrorNotNull(clientEmailInput, clientEmailSymbol);
                    } if (!passwordNew) {
                      setErrorNotNull(passwordNewInput, passwordNewSymbol);
                    } if (passwordNew !== passwordNewRepeat) {
                      setErrorNotNull(passwordRepeatInput, passwordRepeatSymbol);
                    }
                    if (passwordNew.length < 9) {
                      setErrorIncorrectLength(errorLength);
                    }
                  }}
                >
                  Изменить пароль
                </button>
              )}
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

const ConnectedChangePassword = connect(
  (state) => ({
    pages: state,
  }),
)(ChangePassword);

export default withRouter(ConnectedChangePassword);
