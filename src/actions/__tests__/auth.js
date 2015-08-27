global.__PRODUCTION__ = true;
jest.autoMockOff();
const expect = require('expect');
const sinon = require('sinon');
const configureStore = require('../../store/configureStore');
const reducers = require('../../reducers');
const store = configureStore(reducers);
const authActions = require('../auth');

let unsubscribe;
let initialState = {
  account: null,
  error: null,
  pending: false
};
let expectedState = {
  account: null,
  error: null,
  pending: false
};

describe('auth actions', () => {

  describe('login', () => {
    beforeEach(() => {
      unsubscribe = store.subscribe(function() {
        expect(store.getState().auth).toEqual(expectedState);
      });
    });

    it('should fail on empty username', () => {
      let spyOnLogin = sinon.spy(authActions, 'shouldAuthenticate');
      expectedState = {
        account: null,
        error: 'No username or passphrase supplied',
        pending: false
      }
      store.dispatch(authActions.shouldAuthenticate(initialState, '', 'testytesttest'));
      expect(spyOnLogin.calledOnce).toBe(true);
    });

    it('should fail on empty passphrase', () => {
      let spyOnLogin = sinon.spy(authActions, 'shouldAuthenticate');
      expectedState = {
        account: null,
        error: 'No username or passphrase supplied',
        pending: false
      }
      store.dispatch(authActions.shouldAuthenticate(initialState, 'testytesttest', ''));
      expect(spyOnLogin.calledOnce).toBe(true);
    });

    it('should attempt authentication if supplied a username and passphrase', () => {
      let spyOnLogin = sinon.spy(authActions, 'shouldAuthenticate');
      let initialState = {
        account: null,
        error: null,
        pending: false
      };
      expectedState = {
        account: null,
        error: null,
        pending: false
      }
      const shouldAuth = authActions.shouldAuthenticate(
        { auth: initialState }, 'testytesttest', 'testytesttest'
      );
      expect(spyOnLogin.calledOnce).toBe(true);
      expect(shouldAuth(store.dispatch)).toBe(true);
    });

    it('should not attempt authentication if pending', () => {
      let spyOnLogin = sinon.spy(authActions, 'shouldAuthenticate');
      let initialState = {
        account: {},
        error: null,
        pending: true
      };
      expectedState = {
        account: null,
        error: null,
        pending: false
      }
      const shouldAuth = authActions.shouldAuthenticate(
        { auth: initialState }, 'testytesttest', 'testytesttest'
      );
      expect(spyOnLogin.calledOnce).toBe(true);
      expect(shouldAuth(store.dispatch)).toBe(false);
    });

    it('should poke the login function, even though it is kinda pointless', () => {
      expectedState = {
        account: null,
        error: null,
        pending: true
      }
      store.dispatch(authActions.login('testytesttest', 'testytesttest'));
    });

    afterEach(() => {
      unsubscribe();
      if (authActions.shouldAuthenticate.restore) authActions.shouldAuthenticate.restore();
    });
  });

  describe('requestAuthentication', () => {
    it('should should create an action to set login to pending', () => {
      const reqAuth = authActions.requestAuthentication();
      expect(reqAuth).toEqual({
        type: authActions.LOGIN_PENDING
     });
    });
  });

  describe('authenticationSucceeded', () => {
    it('should should create an action to set login as successful', () => {
      const reqAuth = authActions.authenticationSucceeded({
        username: 'testusername',
        passphrase: 'testpassphrase'
      });
      expect(reqAuth).toEqual({
        type: authActions.LOGIN_SUCCESS,
        account: {
          username: 'testusername',
          passphrase: 'testpassphrase'
        }
      });
    });
  });

  describe('authenticationFailed', () => {
    it('should should create an action to set login as failed', () => {
      const reqAuth = authActions.authenticationFailed('No username or passphrase supplied');
      expect(reqAuth).toEqual({
        type: authActions.LOGIN_FAIL,
        error: 'No username or passphrase supplied'
      });
    });
  });

  describe('deauthenticatedSession', () => {
    it('should should create an action to log out', () => {
      const reqDeauth = authActions.deauthenticatedSession();
      expect(reqDeauth).toEqual({
        type: authActions.LOGOUT,
        account: undefined
      });
    });
  });

  describe('authenticateSession', () => {
    beforeEach(() => {
      unsubscribe = store.subscribe(function() {
        expect(store.getState().auth).toEqual(expectedState);
      });
    });

    it('should authenticate a session given a username and passphrase', () => {
      let authSessionSpy = sinon.spy(authActions, 'authenticateSession');
      expectedState = {
        account: null,
        error: null,
        pending: true
      }
      // mock crypton
      global.crypton = {
        authorize: (username, passphrase, cb) => {
          cb(null, {});
        }
      };
      store.dispatch(authActions.authenticateSession('testytesttest', 'testytesttest'));
      expect(authSessionSpy.calledOnce).toBe(true);
    });

    it('should fail to authenticate a session given an incorrect username and passphrase', () => {
      const authSessionSpy = sinon.spy(authActions, 'authenticateSession');
      expectedState = {
        account: null,
        error: null,
        pending: true
      }
      // mock crypton
      global.crypton = {
        authorize: (username, passphrase, cb) => {
          cb('error message', null);
        }
      };
      store.dispatch(authActions.authenticateSession('testytesttest', 'testytesttes'));
      expect(authSessionSpy.calledOnce).toBe(true);
    });

    afterEach(() => {
      unsubscribe();
      authActions.authenticateSession.restore();
    });
  });

  describe('deauthenticateSession', () => {
    beforeEach(() => {
      unsubscribe = store.subscribe(function() {
        expect(store.getState().auth).toEqual(expectedState);
      });
    });

    it('should fail on empty username', () => {
      let loggedInInitialState = {
        account: {
          username: 'testusername',
          password: 'testpassphrase'
        }
      };
      let spyOnLogin = sinon.spy(authActions, 'deauthenticateSession');
      expectedState = {
        account: null,
        error: null,
        pending: false
      }
      store.dispatch(authActions.deauthenticateSession({ auth: loggedInInitialState }));
      expect(spyOnLogin.calledOnce).toBe(true);
    });

    it('should return false with no username', () => {
      let loggedInInitialState = {
        account: {
          username: '',
          password: 'testpassphrase'
        }
      };
      let spyOnLogin = sinon.spy(authActions, 'deauthenticateSession');
      expectedState = {
        account: null,
        error: null,
        pending: false
      }
      const didDeauth = authActions.deauthenticateSession({ auth: loggedInInitialState });
      expect(didDeauth(store.dispatch)).toBe(false);
      expect(spyOnLogin.calledOnce).toBe(true);
    });

    afterEach(() => {
      unsubscribe();
      authActions.deauthenticateSession.restore();
    });
  });
});
