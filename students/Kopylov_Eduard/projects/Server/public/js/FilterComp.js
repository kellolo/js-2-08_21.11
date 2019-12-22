Vue.component ('filter-comp', {

   
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-on:input="LiveSearch" id ="inp">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `,
    props: ['item', 'imgProp'],

    methods:
    {
        LiveSearch()
        {
            let a = document.querySelector('#inp');
            const reg = /[A-Z]|| [a-z]/gi ;

            a.oninput = function()
            {
                let val = this.value.trim();
                let items = document.querySelectorAll('.product-item');
                let h = document.querySelectorAll('h3');
                if (val.match(reg)) {
                    items.forEach(function(elem)
                    {
                        if (elem.innerText.search(val) == -1 )
                        {
                            elem.classList.add('invisible');
                            //elem.innerHTML = elem.innerText;
                        }
                        else 
                        {
                            elem.classList.remove('invisible')
                            //let str = elem.innerText;
                            // elem.innerHTML = function()
                            // {
                            //     return str.slice(0,pos)+ '<mark>' + str.slice (pos,pos+len) + '<mark>' + str.slice(pos+len);
                            // }
                           
                        }
                    })
                }
                else {
                    items.forEach(function(elem)
                    {
                        elem.classList.remove('invisible')
                       // elem.innerHTML = elem.innerText;
                    })
                }
            }
        },

        
    }
})