import { sendPage, sendData } from '../utils';
import { userModel, courseModel, courseMemberModel } from '../models';
import { validator } from '../services';
import { userCtrl, courseCtrl } from '.';

/**
 * 登录页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function getLoginPage(ctx) {
  console.log("log in func");
  // 若是已经登陆，则重定向到登陆首页
  if (ctx.user_id) {
    ctx.status = 302;
    if (ctx.is_manager) {
      ctx.set('Location', '/userd');
    } else {
      ctx.set('Location', '/course');
    }
  } else {
    // TODO 若是未登陆，则发送对应的网页
    sendPage(ctx, 200);
  }
}

/**
 * 获取修改密码页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function changePasswordPage(ctx) {
  // TODO
  sendPage(ctx, 200);
}

/**
 * 管理员登录页面 教师列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function getAllTeachersListPage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    sendPage(ctx, 200, JSON.stringify(await userModel.getAllUsersList()));
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 管理员手动添加教师的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function addTeacherPage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    sendPage(ctx, 200);
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 选择某个教师进入课程列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function getAllCoursesByTeacherIDPage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    const user_id = ctx.params.user_id;
    if (!user_id || !validator.is_userID(user_id || (await userModel.getUsernameByUserID(user_id)).length !== 1)) {
      sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
      return;
    }
    sendPage(ctx, 200, JSON.stringify(await userModel.getAllCoursesByUserID(user_id)));
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 管理员添加课程的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function addCoursePage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    sendPage(ctx, 200);
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 管理员选择某个教师进入课程列表再选择课程进入该课程的学生列表
 * 
 * @export
 * @param {any} ctx 
 */
export async function courseMemberPage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    const user_id = ctx.params.user_id,
      course_id = ctx.params.course_id;
    if (!user_id || !course_id
      || !validator.is_userID(user_id) || !validator.is_courseID(course_id)
      || (await courseModel.getUserIDByCourseID(user_id)) != user_id) {
      sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
      return;
    }
    sendPage(ctx, 200, JSON.stringify(await courseMemberModel.getCourseMember(course_id)));
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}

/**
 * 管理员手动添加课程学生的页面
 * 
 * @export
 * @param {any} ctx 
 */
export async function addCourseMemberPage(ctx) {
  // TODO
  if (ctx.is_manager === 1) {
    const user_id = ctx.params.user_id,
      course_id = ctx.params.course_id;
    if (!user_id || !course_id
      || !validator.is_userID(user_id) || !validator.is_courseID(course_id)
      || (await courseModel.getUserIDByCourseID(user_id)) != user_id) {
      sendData(ctx, 400, JSON.stringify({ message: '请求错误' }));
      return;
    }
    sendPage(ctx, 200);
  } else {
    sendData(ctx, 401, JSON.stringify({ message: '您没有权限' }));
  }
}
