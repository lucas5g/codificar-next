import { IssueController } from "../../../../backend/controllers/IssueController.mjs"

export default function issues(req, res) {

    IssueController.index(req, res)

}