class ValidateEmail {
  public adminPermission = (email: string) => {
    const array = [
      'alvin19official@gmail.com',
      'sm048314916@gmail.com',
      '20br13468@rit.ac.in',
      '20br13697@rit.ac.in',
      '20br13360@rit.ac.in',
      '20br13364@rit.ac.in',
      'vigneshcse2024@gmail.com',
    ];
    if (array.includes(email)) return true;
    return false;
  };

  public studentPermission = (email: string) => {
    const domain = email.replace(/.*@/, '');
    if (domain === 'rit.ac.in') {
      const studentRegex = /^\d{2}[a-z]{2}\d{5}@rit.ac.in$/;
      if (email.match(studentRegex)) {
        return true;
      }
      return false;
    }
  };

  public teacherPermission = (email: string) => {
    const domain = email.replace(/.*@/, '');
    if (domain === 'rit.ac.in') {
      const teacherRegex = /^[a-z]+[a-z0-9._]*@rit.ac.in$/;
      if (email.match(teacherRegex)) {
        return true;
      }
      return false;
    }
    return false;
  };
}

export default ValidateEmail;
