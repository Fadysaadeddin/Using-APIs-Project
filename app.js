
let input = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');
let spinner = document.createElement('div');
spinner.className = 'spinner';
spinner.style.display = 'none'; 
reposData.appendChild(spinner);
getButton.addEventListener('click', getRepos);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getRepos() {
    let githubUser = input.value.trim()

   if (githubUser === '') {
       reposData.innerHTML = '<span> Please enter a valid username </span>';
   } else {
       try {
        spinner.style.display = 'block';
  

        await delay(1000);

  const response = await fetch(`https://api.github.com/users/${githubUser}/repos`);
  
  if (!response.ok) {
    
      throw new Error(`Fetch failed: ${response.status}`);
  }
  
  const data = await response.json();
  reposData.innerHTML = '';

 spinner.style.display = 'none';
  
  if (data.length === 0) {
  reposData.innerHTML = `<span>No repositories found for user "${githubUser}".</span>`;
  } else {
   repoRendering(data , githubUser)

  }  
       } catch (error) {
       
        renderingError(error)

       }
   }
        }


 function repoRendering(data , githubUser){

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
 
   function renderingError(error){
    reposData.innerHTML = '';
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('error-div');
    
    let errorMessage = document.createElement('span');
    errorMessage.textContent = `Error: ${error.message}`;
    errorDiv.appendChild(errorMessage);
    
    let tryAgainButton = document.createElement('span');
    tryAgainButton.textContent = 'Try Again';
    errorDiv.appendChild(tryAgainButton);
    reposData.appendChild(errorDiv);
  
    
}
