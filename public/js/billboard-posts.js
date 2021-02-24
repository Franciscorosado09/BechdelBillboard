// // Wait for the DOM to completely load before we run our JS
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM loaded! 🚀');
  
//     const billboardContainer = document.querySelector('.billboard-container');
  
//     // Variable to hold our billboards
//     let billboards;
  
//     const getbillboards = (user) => {
//       userId = user || '';
//       if (userId) {
//         userId = `/?user_id=${userId}`;
//       }
  
//       fetch(`/api/billboard${userId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           billboards = data;
//           console.log('Success in getting billboard:', data);
//           if (!data || !data.length) {
//             displayEmpty(user);
//           } else {
//             initializeRows();
//           }
//         })
//         .catch((error) => console.error('Error:', error));
//     };
  
//     // Get a billboard billboard from a specific user
//     const url = window.location.search;
//     let userId;
//     if (url.indexOf('?user_id=') !== -1) {
//       userId = url.split('=')[1];
//       getbillboards(userId);
//     } else {
//       getbillboards();
//     }
  
//     // Front end call to DELETE a billboard
//     const deletebillboard = (id) => {
//       fetch(`/api/billboards/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }).then(getbillboards());
//     };
  
//     // Create HTML rows for the billboard container
//     const initializeRows = () => {
//       billboardContainer.innerHTML = '';
//       const billboardsToAdd = [];
  
//       billboards.forEach((billboard) => billboardsToAdd.push(createNewRow(billboard)));
//       billboardsToAdd.forEach((billboard) => billboardContainer.append(billboard));
//     };
  
//     const createNewRow = (billboard) => {
//       console.log('createNewRow -> billboard', billboard);
  
//       const formattedDate = new Date(billboard.createdAt).toLocaleDateString();
  
//       const newbillboardCard = document.createElement('div');
//       newbillboardCard.classList.add('card');
  
//       const newbillboardCardHeading = document.createElement('div');
//       newbillboardCardHeading.classList.add('card-header');
  
//       // Delete button
//       const deleteBtn = document.createElement('button');
//       deleteBtn.textContent = 'x';
//       deleteBtn.classList.add('delete', 'btn', 'btn-danger');
//       deleteBtn.addEventListener('click', handlebillboardDelete);
  
//       // Edit button
//       const editButton = document.createElement('button');
//       editButton.textContent = 'EDIT';
//       editButton.classList.add('edit', 'btn', 'btn-info');
//       editButton.addEventListener('click', handlebillboardEdit);
  
//       const newbillboardTitle = document.createElement('h2');
//       const newbillboardDate = document.createElement('small');
//       const newbillboarduser = document.createElement('h5');
  
//       newbillboarduser.textContent = `Written by: ${billboard.user.name}`;
//       newbillboarduser.style.float = 'right';
//       newbillboarduser.style.color = 'blue';
//       newbillboarduser.style.marginTop = '-10px';
  
//       const newbillboardCardBody = document.createElement('div');
//       newbillboardCardBody.classList.add('card-body');
  
//       const newbillboardBody = document.createElement('p');
//       newbillboardTitle.textContent = `${billboard.title} `;
//       newbillboardBody.textContent = billboard.body;
//       newbillboardDate.textContent = ` (${formattedDate})`;
//       newbillboardTitle.append(newbillboardDate);
//       newbillboardCardHeading.append(deleteBtn);
//       newbillboardCardHeading.append(editButton);
//       newbillboardCardHeading.append(newbillboardTitle);
//       newbillboardCardHeading.append(newbillboarduser);
//       newbillboardCardBody.append(newbillboardBody);
//       newbillboardCard.append(newbillboardCardHeading);
//       newbillboardCard.append(newbillboardCardBody);
//       newbillboardCard.setAttribute('data-billboard', JSON.stringify(billboard));
  
//       console.log('createNewRow -> newbillboardCard', newbillboardCard);
//       return newbillboardCard;
//     };
  
//     // Helper function to display something when there are no billboards
//     const displayEmpty = (id) => {
//       const query = window.location.search;
//       let partial = '';
//       if (id) {
//         partial = ` for user #${id}`;
//       }
  
//       billboardContainer.innerHTML = '';
//       const messageH2 = document.createElement('h2');
//       messageH2.style.textAlign = 'center';
//       messageH2.style.marginTop = '50px';
//       messageH2.innerHTML = `No billboards yet${partial}, navigate <a href='/cms${query}'>here</a> in order to get started.`;
//       billboardContainer.append(messageH2);
//     };
  
//     // Handle when we click the delete billboard button
//     const handlebillboardDelete = (e) => {
//       const currentbillboard = JSON.parse(
//         e.target.parentElement.parentElement.dataset.billboard
//       );
  
//       deletebillboard(currentbillboard.id);
//     };
  
//     // Handle when we click the edit billboard button
//     const handlebillboardEdit = (e) => {
//       const currentbillboard = JSON.parse(
//         e.target.parentElement.parentElement.dataset.billboard
//       );
  
//       window.location.href = `/cms?billboard_id=${currentbillboard.id}`;
//     };
//   });
  