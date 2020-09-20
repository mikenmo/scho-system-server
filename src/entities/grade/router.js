import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/grades/:studNo', async (req, res) => {
  if (!req.params.studNo.match(/20\d\d-\d{5}/)) {
    res.status(500).json({ status: 500, message: 'Student no. invalid' });
  } else {
    try {
      const gradelist = await Ctrl.viewGrades(req.params);
      const data = [];
      var pushed = {};
      var next = [];
      for (let grade of gradelist) {
        const ay = data.find(ay => ay.acadYear === grade.acadYear);
        if (!ay) {
          pushed = { acadYear: grade.acadYear, semesters: [] };
          data.push(pushed);
          next = pushed.semesters;
        } else {
          next = ay.semesters;
        }
        const sem = next.find(sem => sem.semester === grade.semester);
        if (!sem) {
          pushed = { semester: grade.semester, subjects: [] };
          next.push(pushed);
          next = pushed.subjects;
        } else {
          next = sem.subjects;
        }
        next.push({
          id: grade.id,
          subject: grade.subject,
          grade: grade.grade,
          units: grade.units
        });
      }
      res.status(200).json({
        status: 200,
        message: 'Successfully retrieved all grades',
        data: data
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  }
});

router.post('/api/grades', async (req, res) => {
  if (req.body.subject.length > 10) {
    res.status(500).json({
      status: 500,
      message: 'Subject character length exceeded character limit'
    });
  } else if (!req.body.studNo.match(/20\d\d-\d{5}/)) {
    res.status(500).json({ status: 500, message: 'Student no. invalid' });
  } else if (req.body.units % 1 != 0) {
    res.status(500).json({ status: 500, message: 'No. of units is invalid' });
  } else if (
    [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 5].indexOf(
      parseFloat(req.body.grade)
    ) < 0
  ) {
    res.status(500).json({ status: 500, message: 'Grade is invalid' });
  } else if (!req.body.acadYear.match(/20\d\d\s?-\s?20\d\d/)) {
    res.status(500).json({ status: 500, message: 'Academic Year is invalid' });
  } else if (
    req.body.semester.toLowerCase() != '1st semester' &&
    req.body.semester.toLowerCase() != '2nd semester' &&
    req.body.semester.toLowerCase() != 'midyear'
  ) {
    res.status(500).json({ status: 500, message: 'Semester is invalid' });
  } else {
    try {
      const id = await Ctrl.addGrade({
        studNo: req.body.studNo,
        subject: req.body.subject,
        grade: req.body.grade,
        units: req.body.units,
        acadYear: req.body.acadYear,
        semester: req.body.semester
      });

      res.status(200).json({
        status: 200,
        message: 'Successfully added grade',
        data: id
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  }
});

router.delete('/api/grades/:id', async (req, res) => {
  if (req.params.id % 1 != 0) {
    res.status(500).json({ status: 500, message: 'ID invalid' });
  } else {
    try {
      await Ctrl.removeGrade(req.params);

      res.status(200).json({
        status: 200,
        message: 'Successfully removed grade'
      });
    } catch (status) {
      if (status == 404) {
        res.status(404).json({ status: 404, message: 'Not found' });
      } else {
        res.status(500).json({ status: 500, message: 'Internal server error' });
      }
    }
  }
});

router.put('/api/grades', async (req, res) => {
  if (req.body.id % 1 != 0) {
    res.status(500).json({ status: 500, message: 'ID invalid' });
  } else if (req.body.subject.length > 10) {
    res.status(500).json({
      status: 500,
      message: 'Subject character length exceeded character limit'
    });
  } else if (req.body.units % 1 != 0) {
    res.status(500).json({ status: 500, message: 'No. of units is invalid' });
  } else if (
    [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 5].indexOf(
      parseFloat(req.body.grade)
    ) < 0
  ) {
    res.status(500).json({ status: 500, message: 'Grade is invalid' });
  } else if (!req.body.acadYear.match(/20\d\d\s?-\s?20\d\d/)) {
    res.status(500).json({ status: 500, message: 'Academic Year is invalid' });
  } else if (
    req.body.semester.toLowerCase() != '1st semester' &&
    req.body.semester.toLowerCase() != '2nd semester' &&
    req.body.semester.toLowerCase() != 'midyear'
  ) {
    res.status(500).json({ status: 500, message: 'Semester is invalid' });
  } else {
    try {
      await Ctrl.editGrade({
        id: req.body.id,
        subject: req.body.subject,
        grade: req.body.grade,
        units: req.body.units,
        acadYear: req.body.acadYear,
        semester: req.body.semester
      });

      res.status(200).json({
        status: 200,
        message: 'Successfully edited grade'
      });
    } catch (status) {
      if (status == 500) {
        res.status(500).json({ status: 500, message: 'Internal server error' });
      } else {
        res.status(404).json({ status: 404, message: 'Not Found' });
      }
    }
  }
});

router.get('/api/tracker', async (req, res) => {
  if (!req.body.acadYear.match(/20\d\d\s?-\s?20\d\d/)) {
    res.status(500).json({ status: 500, message: 'Academic Year is invalid' });
  } else if (
    req.body.semester.toLowerCase() != '1st semester' &&
    req.body.semester.toLowerCase() != '2nd semester' &&
    req.body.semester.toLowerCase() != 'midyear'
  ) {
    res.status(500).json({ status: 500, message: 'Semester is invalid' });
  } else {
    try {
      const grade = await Ctrl.viewOrgGWA(req.body);

      res.status(200).json({
        status: 200,
        message: 'Successfully retrieved org gwa',
        data: grade
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  }
});

router.get('/api/tracker/:studNo', async (req, res) => {
  if (!req.params.studNo.match(/20\d\d-\d{5}/)) {
    res.status(500).json({ status: 500, message: 'Student no. invalid' });
  } else {
    try {
      const gwa = await Ctrl.viewGWA(req.params);

      res.status(200).json({
        status: 200,
        message: 'Successfully retrieved gwa',
        data: gwa
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  }
});

export default router;
