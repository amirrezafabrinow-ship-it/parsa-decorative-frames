const products = [...document.querySelectorAll('.product-card')];
const filters = [...document.querySelectorAll('.filter')];
const emptyState = document.getElementById('empty-state');
const cart = [];
const fmt = n => new Intl.NumberFormat('fa-IR').format(n);
function renderCart(){
  const list = document.getElementById('cart-items');
  const count = cart.reduce((s,p)=>s+p.qty,0);
  document.getElementById('cart-count').textContent = fmt(count);
  document.getElementById('cart-total').textContent = fmt(cart.reduce((s,p)=>s+p.price*p.qty,0))+' تومان';
  if(!cart.length){list.innerHTML='<p class="cart-empty">سبد خریدت هنوز خالیه.</p>';return;}
  list.innerHTML=cart.map((p,i)=>`<div class="cart-row"><div>${p.name}<small>${fmt(p.price)} تومان × ${fmt(p.qty)}</small></div><button data-remove="${i}">حذف</button></div>`).join('');
}
document.addEventListener('click',e=>{
  const add=e.target.closest('.quick-add');
  if(add){const name=add.dataset.name,price=Number(add.dataset.price);const found=cart.find(p=>p.name===name);found?found.qty++:cart.push({name,price,qty:1});renderCart();add.textContent='به سبد اضافه شد ✓';setTimeout(()=>add.textContent='+ افزودن به سبد',1200);}
  const remove=e.target.closest('[data-remove]');if(remove){cart.splice(Number(remove.dataset.remove),1);renderCart();}
  const filter=e.target.closest('[data-filter]');if(filter){const value=filter.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===value));let shown=0;products.forEach(p=>{const visible=value==='همه'||p.dataset.category===value;p.hidden=!visible;if(visible)shown++;});emptyState.hidden=shown>0;}
});
const drawer=document.getElementById('cart-drawer'),overlay=document.getElementById('overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('open');drawer.setAttribute('aria-hidden','false');}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('open');drawer.setAttribute('aria-hidden','true');}
document.getElementById('cart-toggle').addEventListener('click',openCart);
document.getElementById('cart-close').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
document.getElementById('checkout').addEventListener('click',()=>alert('این نسخه نمایشی است؛ برای ثبت سفارش واقعی باید درگاه پرداخت و سیستم سفارش‌گیری متصل شود.'));
document.querySelectorAll('.collection-card').forEach(card=>card.addEventListener('click',()=>{const f=card.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===f));products.forEach(p=>p.hidden=f!=='همه'&&p.dataset.category!==f);}));
const searchBar=document.getElementById('search-bar'),searchInput=document.getElementById('search-input');
document.getElementById('search-toggle').addEventListener('click',()=>{searchBar.classList.add('open');searchInput.focus();});
document.getElementById('search-close').addEventListener('click',()=>searchBar.classList.remove('open'));
searchInput.addEventListener('input',()=>{const q=searchInput.value.trim();let n=0;products.forEach(p=>{const ok=p.innerText.includes(q);p.hidden=!ok;if(ok)n++;});emptyState.hidden=n>0;document.getElementById('products').scrollIntoView({behavior:'smooth'});});
document.getElementById('menu-toggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
document.getElementById('newsletter-form').addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletter-message').textContent='ممنون از همراهی‌ات! خبرهای تازه به‌زودی با توست.';e.target.reset();});
renderCart();
