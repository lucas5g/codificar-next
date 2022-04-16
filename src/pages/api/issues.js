import { IssueController } from "../../../backend/controllers/IssueController.mjs"

export default function issues(req, res) {

    IssueController.index(req, res)


    // IssueController.test(req, res)
    // res.status(200).json({ name: 'John Doe' })
}