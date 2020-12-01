/* jshint esversion: 6 */
import { gulp, gulpHelper } from './startup/index.js';

gulpHelper.DIRMAP = {
    Dashboard: './cases/Dashboard/', // 首页
    AdminPermission: './cases/AdminPermission/', // 管理员权限列表
    Archive: './cases/Archive/', // 公文归档
    Bulletin: './cases/Bulletin/', // 通知公告管理
    ContentFragment: './cases/ContentFragment/', // 正文用语
    ContentTemplate: './cases/ContentTemplate/', // 正文模板管理
    Flow: './cases/Flow/', // 流程管理
    Form: './cases/Form/', // 表单管理
    HeaderTemplate: './cases/HeaderTemplate/', // 红头模板管理
    ManageFlow: './cases/ManageFlow/', // 任务翻转
    ManageOfficialDoc: './cases/ManageOfficialDoc/', // 公文处理
    ManageTask: './cases/ManageTask/', // 任务重置
    Navigation: './cases/Navigation/', // 菜单管理
    Org: './cases/Org/', // 机构管理
    Query: './cases/Query/', // 综合查询
    QueryReview: './cases/QueryReview/', // 综合传阅呈送查询
    Receive: './cases/Receive/', // 收文管理
    ReportTemplate: './cases/ReportTemplate/', // 稿纸模板管理
    Role: './cases/Role/', // 角色管理
    Seal: './cases/Seal/', // 公章管理
    Search: './cases/Search/', // 全文检索
    Send: './cases/Send/', // 发文管理
    SendCounter: './cases/SendCounter/', // 计数器管理
    Signature: './cases/Signature/', // 签名管理
    Task: './cases/Task/', // 委托待办
    User: './cases/User/', // 用户管理
    UserComment: './cases/UserComment/', // 个人常用语管理
    UserQuery: './cases/UserQuery/', // 个人查询
    UserQueryReview: './cases/UserQueryReview/', // 个人传阅呈送查询
    UserReminder: './cases/UserReminder/', // 个人工作提醒,
    allCases: './allCases/scripts/'
};
let vus = 1;
let iterations = 1;
let options = '--vus ' + vus + ' --iterations ' + iterations;
gulp.task(`test-dir-Dashboard`, (callback) => { gulpHelper.dirRun(`Dashboard`, options, callback); });
gulp.task(`test-outDir-Dashboard`, (callback) => { gulpHelper.diroutRun(`Form`, options, callback); });

gulp.task('all', gulp.series(`test-dir-Dashboard`));
