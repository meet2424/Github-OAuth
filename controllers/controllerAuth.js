
const axios = require('axios');

exports.githubSignin = (req, res) => {

    const redirect_uri = "http://localhost:3001/user/signin/github/callback";

    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
    );
}

exports.githubSigninCallback = async (req, res) => {

    const code = req.query.code;

    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
    }
    const opts = { headers: { accept: 'application/json' } };

    try {
        const response = await axios.post("https://github.com/login/oauth/access_token", body, opts)
        const access_token = response.data.access_token

        if (!access_token) {
            return res.status(404).json({
                success: false,
                message: 'Not Authorize'
            })
        }
        const user = await fetchGitHubUser(access_token);
        return res.status(200).json({
            success: true,
            message: 'Authorized',
            data: user
        })

    } catch (error) {
        //SERVER ERROR
        console.log(error);
        return res.status(505).json({
            success: false,
            error: 'Invalid Credentials'
        })
    }

}

const fetchGitHubUser = async (token) => {
    const request = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: "token " + token
        }
    });
    return request.data;
}
// GITHUB_CLIENT_ID = 6bd5c8a517c00a931aa2
// GITHUB_SECRET = ef9d8bb204904ae3336541e3ec51483a59ff9f8b