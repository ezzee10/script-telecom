
const getData = async () => {

    const html = (await (await fetch('https://institucional.telecom.com.ar/prensa/notas/2021-08-23/index.html')).text());
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    const { body } = doc

    let imgs = body.getElementsByTagName('img')

    let imgs_arr = [...imgs] 

    imgs_arr.forEach(img => {
        img.src='xdxdxd'
    });

    const hgroup = body.getElementsByTagName('hgroup')[0].children

    let date = hgroup[0]

    let date_brs = date.getElementsByTagName('br')

    while (date_brs.length) {
        date_brs[0].parentNode.removeChild(date_brs[0]);
    }
    
    let title = hgroup[1]

    const banner = body.getElementsByClassName('img-responsive')[0]

    const body_text = body.getElementsByClassName('txt13')[0]

    let final_object = {
        date: date.outerHTML,
        title: title.outerHTML,
        body: body_text.outerHTML,
    }

    console.log(date)
    console.log(title)
    console.log(banner)
    console.log(body_text)
    console.log(final_object)

    fetch('http://localhost:4000/api/notes', {
        method: 'POST', 
        body: JSON.stringify(final_object), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

}

getData()



