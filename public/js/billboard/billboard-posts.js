// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
  
    const billboardContainer = document.querySelector('.billboard-container');
  
    // Variable to hold our billboards
    let billboards;
    console.log("Hello I'm working")
  
    const getBillboards = (user) => {
      console.log('inside getbillboards')
      userId = user || '';
      if (userId) {
        userId = `/?user_id=${userId}`;
      }
  
      fetch(`/api/billboard${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          billboards = data;
          console.log(data)
          console.log(billboards[0].image)
          console.log('Success in getting billboards:', data);
          if (!data || !data.length) {
            displayEmpty();
          } else {
            initializeRows(billboards);
          }
        })
        .catch((error) => console.error('Error:', error));
       
    };

      

    getBillboards()
    
    // Get a billboard billboard from a specific user
    // const url = window.location.search;
    // let userId;
    // if (url.indexOf('?user_id=') !== -1) {
    //   userId = url.split('=')[1];
    //   getBillboards(userId);
    // } else {
    //   getBillboards();
    // }
  
    // Front end call to DELETE a billboard
    const deletebillboard = (id) => {
      fetch(`/api/billboard/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(getBillboards());
    };
  
    // Create HTML rows for the billboard container
    const initializeRows = () => {
      billboardContainer.innerHTML = '';
      const billboardsToAdd = [];
  
      billboards.forEach((billboard) => billboardsToAdd.push(createNewRow(billboard)));
      billboardsToAdd.forEach((billboard) => billboardContainer.append(billboard));
    };
  
    const createNewRow = (billboard) => {
      console.log('createNewRow -> billboard', billboard);
  
      const formattedDate = new Date(billboard.createdAt).toLocaleDateString();
  
      const newbillboardCard = document.createElement('div');
      newbillboardCard.classList.add('card');
  
      const newbillboardCardHeading = document.createElement('div');
      newbillboardCardHeading.classList.add('card-header');

      
  
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x'
      //deleteBtn.innerHTML = '<a class="glyphicon glyphicon-trash" aria-hidden="true"></a>';
      deleteBtn.classList.add('delete', 'btn', 'btn-danger');
      deleteBtn.addEventListener('click', handlebillboardDelete);
  
      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit'
      //editButton.innerHTML = '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>';
      editButton.classList.add('edit', 'btn', 'btn-info');
      editButton.addEventListener('click', handlebillboardEdit);
      
  
      const newbillboardTitle = document.createElement('h2');
      const newbillboardDate = document.createElement('small');
      //const newbillboardImage = document.createElement('img').setAttribute('src', `${billboard.image}`)
      const newbillboarduser = document.createElement('h5');
      const newbillboardImage = document.createElement('img');
      newbillboardImage.src = `${billboard.image}`
      newbillboardImage.innerHTML = `${billboard.image}`
      console.log(newbillboardImage)
      console.log(billboard.image)

      newbillboarduser.textContent = `Written by: ${billboard.User.email}`;
      newbillboarduser.style.float = 'left';
      newbillboarduser.style.color = '#5d4e60';
      //newbillboarduser.style.marginTop = '5%';
  
      const newbillboardCardPost = document.createElement('div');
      newbillboardCardPost.classList.add('card-Post');
  
      const newbillboardPost = document.createElement('p');
      newbillboardTitle.textContent = `${billboard.title}`;

      newbillboardPost.textContent =`${billboard.post}`;
      newbillboardDate.textContent = ` (${formattedDate})`;
      newbillboardTitle.append(newbillboardDate);
      newbillboardCardHeading.append(deleteBtn);
      newbillboardCardHeading.append(editButton);
      newbillboardCardHeading.append(newbillboardTitle);
      newbillboardCardHeading.append(newbillboarduser);
      newbillboardCardHeading.append(newbillboardImage)
     
      newbillboardCardPost.append(newbillboardPost);
      newbillboardCard.append(newbillboardCardHeading);
      newbillboardCard.append(newbillboardCardPost);
      newbillboardCard.setAttribute('data-billboard', JSON.stringify(billboard));
  
      console.log('createNewRow -> newbillboardCard', newbillboardCard);
      return newbillboardCard;
    };
  
    // Helper function to display something when there are no billboards
    const displayEmpty = (id) => {
      const query = window.location.search;
      let partial = '';
      if (id) {
        partial = ` for user #${id}`;
      }
  
      billboardContainer.innerHTML = '';
      const messageH2 = document.createElement('h2');
      messageH2.style.textAlign = 'center';
      messageH2.style.marginTop = '50px';
      messageH2.innerHTML = `No billboards yet${partial}, navigate <a href='/cms${query}'>here</a> in order to get started.`;
      billboardContainer.append(messageH2);
    };
  
    // Handle when we click the delete billboard button
    const handlebillboardDelete = (e) => {
      
      const currentbillboard = JSON.parse(
        e.target.parentElement.parentElement.dataset.billboard
      );
  
      deletebillboard(currentbillboard.id);
      getBillboards()
    };
  
    // Handle when we click the edit billboard button
    const handlebillboardEdit = (e) => {
      
      const currentbillboard = JSON.parse(
        e.target.parentElement.parentElement.dataset.billboard
      );
      console.log(currentbillboard)
      window.location.href = `/billboard-add.html?Billboard_id=${currentbillboard.id}`;
    };
  });
  