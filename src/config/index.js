import packageJson from '../../package.json';

export default {
  // domain: 'http://192.168.2.115:8014',
  domain: 'http://lazy.shudx.com:8082/lazyApp-api',
  apiPath: '/rest',
  package: packageJson,
  api: {
    uploadFile: '/file/upload',
    userLogin: '/auth/login',
    userThirdLogin: '/auth/thirdLogin',
    userRegister: '/auth/register',
    code: '/auth/code',
    resetPassword: '/auth/resetPassword',
    userLogout: '/logout',
    user: '/user',
    userDoc: '/user/doc',
    userAddress: '/user/address',
    password: '/user/password',
    docUserRelation: '/user/docUserRelation',
    doc: '/doc',
    comment: '/comment',
    message: '/message',
    subject: '/subject',
    subjectDoc: '/subjectDoc',
    homeConfig: '/home/config',
    apiManual: '/apiManual',
  },
};
