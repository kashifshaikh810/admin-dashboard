import{r as o,k as L,j as e,C as I,h as u,d as x,e as S,f as h,g as p,l as V,m as A,n as g,o as j,i as f,p as C,q as E,s as P}from"./index-DrbigQGz.js";import{API_END_POINT as H}from"./DefaultLayout-CZp8RtXO.js";import"./cil-location-pin-CQr6GRP7.js";var q=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"],M=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"];const D=()=>{const[r,v]=o.useState(""),[l,y]=o.useState(""),[n,i]=o.useState(""),[c,a]=o.useState(""),b=L(),N=()=>!r&&!l?(a("Email & Password are required!"),!1):r?l?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?(a(""),!0):(a("Please enter a valid email address!"),!1):(a("Password are required!"),!1):(a("Email are required!"),!1),w=async t=>{if(t.preventDefault(),!!N()){i(!0);try{await P.post(`${H}/admin/login`,{email:r,password:l}).then(s=>{var d,m;(d=s.data)!=null&&d.success?(localStorage.setItem("data",JSON.stringify(s.data)),b("/dashboard"),i(!1)):(a((m=s.data)==null?void 0:m.msg),i(!1))}).catch(s=>{a(s==null?void 0:s.message),i(!1)})}catch(s){a(s==null?void 0:s.message),i(!1)}}};return e.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:e.jsx(I,{children:e.jsx(u,{className:"justify-content-center",children:e.jsx(x,{md:8,children:e.jsxs(S,{children:[e.jsx(h,{className:"p-4",children:e.jsx(p,{children:e.jsxs(V,{onSubmit:w,children:[e.jsx("h1",{children:"Login"}),e.jsx("p",{className:"text-body-secondary",children:"Sign In to your account"}),c&&e.jsx(A,{type:"danger",message:c}),e.jsxs(g,{className:"mb-3",children:[e.jsx(j,{children:e.jsx(f,{icon:M})}),e.jsx(C,{placeholder:"Email",type:"email",value:r,onChange:t=>{v(t.target.value),a("")},autoComplete:"username"})]}),e.jsxs(g,{className:"mb-4",children:[e.jsx(j,{children:e.jsx(f,{icon:q})}),e.jsx(C,{type:"password",placeholder:"Password",autoComplete:"current-password",value:l,onChange:t=>{y(t.target.value),a("")}})]}),e.jsx(u,{children:e.jsx(x,{xs:6,children:e.jsx(E,{disabled:n,color:"success text-light",className:"px-4",type:"submit",children:n?"Wating....":"Login"})})})]})})}),e.jsx(h,{className:"text-white bg-success py-5",style:{width:"44%"},children:e.jsx(p,{className:"text-center",children:e.jsxs("div",{children:[e.jsx("h2",{children:"Welcome to Admin Dashboard"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]})})})]})})})})})};export{D as default};
