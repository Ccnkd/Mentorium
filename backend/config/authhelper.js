// utils/authHelper.js

function determineRole(email) {
  if (email.endsWith('@st.knust.edu.gh')) return 'student';
  if (email.endsWith('@knust.edu.gh')) return 'supervisor';
  return null;
}

const roleConfigs = {
  student: {
    table: 'students',
    getPayload: ({ user_id, firstName, lastName, indexNumber, studentId, gender, cwa, department }) => ({
      user_id,
      firstname: firstName,
      lastname: lastName,
      index_number: indexNumber,
      student_id: studentId,
      current_cwa: cwa,
      department: department,
      gender: gender || null,
    }),
  },
  supervisor: {
    table: 'lecturers',
    getPayload: ({ user_id, email, title, firstName, lastName, gender, department }) => ({
      user_id,
      email: email ?? null,
      title : title ?? null,
      firstname: firstName,
      lastname: lastName,
      gender: gender ?? null,
      department: department,
    }),
  },
};

module.exports = {
  determineRole,
  roleConfigs,
};
