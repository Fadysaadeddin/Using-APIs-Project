
let input = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');
getButton.addEventListener('click', getRepos);
async function getRepos() {
    let githubUser = input.value.trim()

   if (githubUser === '') {
       reposData.innerHTML = '<span> Please enter a valid username </span>';
   } else {
       try {
  const response = await fetch(`https://api.github.com/users/${githubUser}/repos`);
  
  if (!response.ok) {
    
      throw new Error(`Fetch failed: ${response.status}`);
  }
  
  const data = await response.json();
  reposData.innerHTML = '';


  
  if (data.length === 0) {
  reposData.innerHTML = `<span>No repositories found for user "${githubUser}".</span>`;
  } else {
   repoRendering()

  }  
       } catch (error) {
        console.log(`Error: ${error.message}`)

       }
   }
        }


 function repoRendering(){

     data.forEach(repo => {
  let repoDiv = document.createElement('div');
  let repoName = document.createTextNode(repo.name);
  repoDiv.appendChild(repoName);
  repoDiv.className = 'repo-box';
   
  let url = document.createElement('a');
  url.textContent = 'Visit';
  url.href = `https://github.com/${githubUser}/${repo.name}`;
  url.target = '_blank';
  repoDiv.appendChild(url);
   
  let forksSpan = document.createElement('span');
  forksSpan.textContent = `Forks: ${repo.forks}`;
  repoDiv.appendChild(forksSpan);
   
  let description = document.createElement('p');
  description.textContent = repo.description || 'No description';
  repoDiv.appendChild(description);
   
  reposData.appendChild(repoDiv);

  
     });
   }

