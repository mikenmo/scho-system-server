import { Router } from 'express';

import authRouter from './entities/auth/router';
import announcementRouter from './entities/announcement/router';
import bookRouter from './entities/book/router';
import dateRouter from './entities/date/router';
import gradeRouter from './entities/grade/router';
import schobabyRouter from './entities/schobaby/router';
import schopointsRouter from './entities/schopoints/router';
import userRouter from './entities/user/router';

const router = Router();

router.use('/', authRouter);
router.use(announcementRouter);
router.use(bookRouter);
router.use(dateRouter);
router.use(gradeRouter);
router.use(schobabyRouter);
router.use(schopointsRouter);
router.use(userRouter);

export default router;
