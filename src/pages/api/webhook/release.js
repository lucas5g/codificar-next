import { exec } from 'child_process'

export default function release(req, res) {


    const { event_name, ref } = req.body

    // console.log(req.body)
    if (event_name !== 'tag_push') {
        console.log({ event_name })
        return res.json({
            event_name
        })
    }

    const command = `ls -la`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
        console.log(stderr)

        console.log(ref)


        res.json({
            msg: 'new release'
        })
    })

}