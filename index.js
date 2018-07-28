// const rootURL = "https://api.github.com"
// let userName = 'hsoloman83'
// let fork = `${userName}/javascript-fetch-lab`
//
// function getIssues() {
//   fetch(`${rootURL}/repos/${fork}/issues`, {
//     method: "GET",
//     headers: {
//       Authorization: `token ${getToken()}`
//     }
//   }).then(res => res.json()).then(json => showIssues(json))
// }
//
// function showIssues(json) {
//   const issuesTemplate = Handlebars.compile(document.getElementById('issues-template').innerHTML)
//   document.getElementById('issues').innerHTML = issuesTemplate(json)
// }
//
// function createIssue() {
//   let titleData = document.getElementById('title').value;
//   let bodyData = document.getElementById('body').value;
//   let postData = {title: titleData, body: bodyData}
//   fetch(`${rootURL}/repos/${fork}/issues`, {
//     method: "POST",
//     header: {
//       Authorization: `token ${getToken()}`
//     },
//     body: JSON.stringify(postData)
//   }).then(getIssues());
// }
//
// function showResults(json) {
//   let resultTemplate = Handlebars.compile(document.getElementById('repo-template').innerHTML);
// 	document.getElementById('results').innerHTML = resultTemplate(json);
// }
//
// function forkRepo() {
//   const repo = 'learn-co-curriculum/javascript-fetch-lab'
//   //use fetch to fork it!
//   fetch(`${rootURL}/repos/${repo}/forks`, {
//     method: "POST",
//     headers: {
//       Authorization: `token ${getToken()}`
//     }
//   }).then(res => res.json()).then(json => showResults(json));
// }
//
// function getToken() {
//   //change to your token to run in browser, but set
//   //back to '' before committing so all tests pass
//   return ''
// }


const userName = ''
const baseApi = 'https://api.github.com/'
const fork = `${userName}/javascript-fetch-lab`

//Issue and Repo objects and templates

function Issue(attributes){
  this.title = attributes.title;
  this.body = attributes.body;
  this.url = attributes.url;
}

function Repo(attributes){
  this.url = attributes.url;
}
//creating a prototype for the issues function
//variable with the value of a html li tag containing a link
//to the issue of the repo that is being viewed
Issue.prototype.template = function(){
   var template = `<li>Title: <a href="${this.url}">${this.title} </a><span> | Body: ${this.body}</span></li>`
   return template;
};
//repo function prototype same as above but a link to the success
Repo.prototype.template = function(){
  var template = `<h3>Forked Successfully!</h3><a href="${this.url}"> ${this.url}</a>`
  return template;
};

//Create an issue through the Github API
//creates variables equal to the value of #title and body
//variable equal to an object with a key of title and a value of issueTitle,
//and a body key with value of issueBody
//then fetch the data
//using above variable baseApi const baseApi = 'https://api.github.com/' repos/
//then fork variable made above const fork = `${userName}/javascript-fetch-lab`
//this puts in the username value from const userName = ''
//using the post method to send data and

//POST refresher - POST submits data to be processed
// (e.g., from an HTML form) to the identified resource.
// The data is included in the body of the request.
// This may result in the creation of a new resource
// or the updates of existing resources or both.

//headers - 
function createIssue() {
  const issueTitle = document.getElementById('title').value
  const issueBody = document.getElementById('body').value
  const postData = { title: issueTitle, body: issueBody }
  fetch(`${baseApi}repos/${fork}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${getToken()}`
    },
    body: JSON.stringify(postData)
  }).then(resp => getIssues())
}

//Fetch all issues through the Github API and display / append to the DOM

function getIssues(data) {
  fetch(`${baseApi}repos/${fork}/issues`).
    then(resp => {
      resp.json().then( data => {
        for (let i = 0; i < data.length; i++){
          displayIssue(new Issue(data[i]));
        }
      } )
    })
}

function displayIssue(issue) {
  $('#issues').append(issue.template())
}

//Fetch and show repo info


function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'

  fetch(`${baseApi}repos/${repo}/forks`, {
    method: 'post',
    headers: {
      'Authorization': `token ${getToken()}`
    }
  }).then(resp => {
    let repo = new Repo(resp);
    showForkedRepo(repo);
  })
}

function showForkedRepo(repo) {
  $('#results').append(repo.template())
}


function getToken() {
  return ''
}
