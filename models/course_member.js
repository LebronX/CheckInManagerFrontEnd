import { execAsync } from './util';

// 课程成员
export async function createCourseMemberTable() {
  return await execAsync(
    `CREATE TABLE IF NOT EXISTS COURSE_MEMBER(
      course_id    VARCHAR(50) 	NOT NULL,
      student_id   VARCHAR(50) 	NOT NULL,
      PRIMARY KEY (course_id, student_id)
    )`,
    undefined,
    'create COURSE_MEMBER');
}

export async function dropCourseMemberTable() {
  return await execAsync('DROP TABLE COURSE_MEMBER', undefined, 'drop table COURSE_MEMBER');
}

// 获得某个课程的学生列表
export async function getCourseMember(course_id) {
  return await execAsync(
    `SELECT STUDENT.student_id, student_name
        FROM STUDENT
      LEFT JOIN
        COURSE_MEMBER
	    ON STUDENT.student_id = COURSE_MEMBER.student_id
    WHERE course_id = ?`,
    [course_id],
    `select all students by course_id ${course_id}`
  );
}

// 管理员的权限 ----------------------------

// 添加课程学生
export async function insertCourseMember(course_id, student_id) {
  return await execAsync(
    `INSERT INTO COURSE_MEMBER (course_id, student_id) VALUE (?, ?)`,
    [course_id, student_id],
    `insert student ${student_id} by course_id ${course_id}`
  );
}

// 删除课程中的某个学生
export async function deleteCourseMember(course_id, student_id) {
  return await execAsync(
    `DELETE FROM COURSE_MEMBER WHERE course_id = ? AND student_id = ?`,
    [course_id, student_id],
    `delete student ${student_id} in course ${course_id}`
  );
}

// 删除课程中的所有学生
export async function deleteAllCourseMember(course_id) {
  return await execAsync(
    `DELETE FROM COURSE_MEMBER WHERE course_id = ?`,
    [course_id],
    `delete all students in course ${course_id}`
  );
}
