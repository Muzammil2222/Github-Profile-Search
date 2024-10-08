document.getElementById('search-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const userDetailsDiv = document.getElementById('user-details');
  
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }
  
    // Reset user details section before loading new data
    userDetailsDiv.innerHTML = "Loading...";
    userDetailsDiv.classList.remove('hidden');
  
    try {
        // Fetch user details from GitHub API
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
            throw new Error('User not found');
        }
  
        const userData = await userResponse.json();
  
        // Use a dummy image if the user has no profile picture
        const profileImage = userData.avatar_url ? userData.avatar_url : 'https://via.placeholder.com/150';
  
        // Render user information (excluding repository list)
        userDetailsDiv.innerHTML = `
            <img src="${profileImage}" alt="${username}'s Profile Picture" class="profile-img" />
            <h2>${userData.name || username}</h2>
            <p>Followers: ${userData.followers}</p>
            <p>Public Repositories: ${userData.public_repos}</p>
            <p>Likes: ${userData.following}</p>
            <a href="${userData.html_url}" target="_blank" class="profile-link">Visit Profile</a>
        `;
  
        // Add animation to show user details
        setTimeout(() => userDetailsDiv.classList.add('show'), 10);
    } catch (error) {
        userDetailsDiv.innerHTML = `<p>${error.message}</p>`;
    }
  });
  