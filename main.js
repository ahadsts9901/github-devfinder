function getDev(event) {
    event.preventDefault()

    document.querySelector(".ins").classList.add("hidden")
    document.querySelector(".result").classList.remove("hidden")
    document.querySelector(".err").classList.add("hidden")
    let userName = document.querySelector("#userInput").value;
    let gitName = document.getElementById("name")
    let gitUsername = document.getElementById("username")
    let gitBio = document.getElementById("bio")
    let gitRepo = document.getElementById("repo")
    let gitFollowers = document.getElementById("followers")
    let gitFollowing = document.getElementById("following")
    let gitLocation = document.getElementById("location")
    let gitTwitter = document.getElementById("twitter")
    let gitUrl = document.getElementById("url")
    let gitCompany = document.getElementById("company")
    let gitProfileImage1 = document.getElementById("image1")
    let gitProfileImage2 = document.getElementById("image2")
    let gitDate = document.getElementById("date")
    axios.get(`https://api.github.com/users/${userName}`)
        .then(function(response) {
            console.log(response.data);
            let date = response.data.created_at.replaceAll("-", " ").slice(0, 10)
            let monthNum = date.slice(5, 7)
            if (monthNum[0] == 0) {
                monthNum = monthNum.slice(1, 2)
            }
            let monthStr = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ]
            let month = monthStr[monthNum]
            let theDate = date.slice(8, 10) + " " + month + " " + date.slice(0, 4)
            let url = response.data.html_url.slice(8)
            gitName.innerHTML = response.data.name
            gitUsername.innerHTML = "@" + response.data.login
            gitBio.innerHTML = response.data.bio
            gitRepo.innerHTML = response.data.public_repos
            gitFollowers.innerHTML = response.data.followers
            gitFollowing.innerHTML = response.data.following
            gitLocation.innerHTML = ` ${response.data.location}`
            gitTwitter.href = "https://twitter.com/" + response.data.twitter_username
            gitTwitter.innerHTML = " @" + response.data.twitter_username
            gitTwitter.target = "_blank"
            gitUrl.innerHTML = ` ${url}`
            gitUrl.href = response.data.html_url
            gitUrl.target = "_blank"
            gitCompany.innerHTML = ` ${response.data.company}`
            gitProfileImage1.src = response.data.avatar_url
            gitProfileImage2.src = response.data.avatar_url
            gitDate.innerHTML = "Joined " + theDate
            if (!gitBio.innerHTML) {
                gitBio.innerHTML = "No Bio"
            }
            if (!response.data.twitter_username) {
                gitTwitter.innerHTML = "Not Available"
                gitTwitter.href = "#"
            }
            if (!gitLocation.innerHTML) {
                gitLocation.innerHTML = "Not Available"
            }
            if (!gitCompany.innerHTML) {
                gitCompany.innerHTML = "Not Available"
            }
        })
        .catch(function(error) {
            console.log(error.data);
            document.querySelector(".err").classList.remove("hidden")
            document.querySelector(".result").classList.add("hidden")
        })

    document.querySelector("#userInput").value = ""
}