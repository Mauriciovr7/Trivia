const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))

/* const admin = () => {

  const us = document.querySelector('.usuario')
  if (us.innerHTML == 'true') {
    const bton_add = document.querySelector('.btn_add')
    bton_add.removeAttribute('hidden')
  }
} */

/* if( req.session.user) {

  admin()
} */