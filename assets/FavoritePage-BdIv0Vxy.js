import{b as j,u as p,r,j as o,L as m,B as f,e as B}from"./index-BzZe7OxC.js";import{a as P,I as d,C as S}from"./selectors-Bb2Txtv-.js";const L="_container_v7uek_1",w="_boxContainer_v7uek_8",A="_containerDesc_v7uek_16",C="_imgBox_v7uek_21",I="_descBox_v7uek_26",F="_boxName_v7uek_29",M="_rateBox_v7uek_33",R="_iconReview_v7uek_40",D="_containerLoot_v7uek_46",O="_imgContainer_v7uek_50",H="_nameProduct_v7uek_55",J="_descProduct_v7uek_63",y="_locationProduct_v7uek_70",E="_containerLocal_v7uek_75",G="_iconLocation_v7uek_78",T="_iconHeart_v7uek_83",V="_iconFavorite_v7uek_87",$="_icon_v7uek_40",q="_priceProduct_v7uek_95",z="_containerImg_v7uek_98",K="_modalLocal_v7uek_101",Q="_modalPrice_v7uek_104",U="_titleModal_v7uek_107",W="_buttonBox_v7uek_123",X="_buttonLoad_v7uek_128",Y="_buttonItem_v7uek_141",Z="_boxShow_v7uek_149",oo="_buttonShow_v7uek_152",to="_detailsButtonsContainer_v7uek_161",eo="_detailsButton_v7uek_161",e={container:L,boxContainer:w,containerDesc:A,imgBox:C,descBox:I,boxName:F,rateBox:M,iconReview:R,containerLoot:D,imgContainer:O,nameProduct:H,descProduct:J,locationProduct:y,containerLocal:E,iconLocation:G,iconHeart:T,iconFavorite:V,icon:$,priceProduct:q,containerImg:z,modalLocal:K,modalPrice:Q,titleModal:U,buttonBox:W,buttonLoad:X,buttonItem:Y,boxShow:Z,buttonShow:oo,detailsButtonsContainer:to,detailsButton:eo},so=()=>{const x=j(),_=p(P),[i,l]=r.useState([]),[c]=r.useState(4),[h,u]=r.useState(!0),g=t=>{const s=localStorage.getItem("favoriteAdverts");if(s){let n=JSON.parse(s);n=n.filter(a=>a._id!==t),localStorage.setItem("favoriteAdverts",JSON.stringify(n)),x(B(t)),l(n.slice(0,i.length))}},b=t=>{_.find(s=>s._id===t._id)&&(f.success("Track was successfully deleted"),g(t._id))};r.useEffect(()=>{const t=localStorage.getItem("favoriteAdverts");if(t){const s=JSON.parse(t);l(s.slice(0,c)),u(s.length>c)}},[c]);const k=()=>{const t=localStorage.getItem("favoriteAdverts");if(t){const s=JSON.parse(t),a=(Math.ceil(i.length/c)+1-1)*c,v=Math.min(a+c,s.length);l(N=>[...N,...s.slice(a,v)]),v>=s.length&&u(!1)}};return o.jsx("div",{className:e.container,children:i.length===0?o.jsx("p",{children:"No favorite adverts yet"}):o.jsxs(o.Fragment,{children:[i.map(t=>o.jsxs("div",{className:e.boxContainer,children:[o.jsx("img",{src:t.gallery[0],alt:"campers",className:e.imgBox}),o.jsxs("div",{className:e.descBox,children:[o.jsxs("div",{className:e.boxName,children:[o.jsx("span",{className:e.nameProduct,children:t.name}),o.jsxs("div",{className:e.iconBox,children:[o.jsxs("span",{className:e.priceProduct,children:["€",t.price]}),o.jsx("button",{className:e.iconHeart,onClick:()=>b(t),children:o.jsx(d,{width:"24px",height:"24px",id:"icon-heart",className:_.some(s=>s._id===t._id)?e.iconFavorite:e.icon})})]})]}),o.jsxs("div",{className:e.containerLocal,children:[o.jsxs(m,{to:"/catalog",className:e.rateBox,children:[o.jsx(d,{width:"16",height:"16",id:"icon-star",className:e.iconReview}),t.rating,"(Reviews ",t.reviews.length,")"]}),o.jsxs("span",{className:e.locationProduct,children:[o.jsx(d,{width:"16",height:"16",id:"icon-map",className:e.iconLocation}),t.location]})]}),o.jsx("p",{className:e.descProduct,children:t.description.length>55?`${t.description.slice(0,55)}...`:t.description}),o.jsx("div",{className:e.detailsButtonsContainer,children:Object.entries(t.details).slice(0,7).map(([s,n])=>o.jsxs("button",{className:e.detailsButton,children:[o.jsx(S,{category:s,className:e.iconDetail}),n," ",s]},s))}),o.jsx("div",{className:e.boxShow,children:o.jsx(m,{to:"/catalog",className:e.buttonShow,children:"Go to Catalog"})})]})]},t._id)),o.jsx("div",{className:e.buttonBox,children:h&&o.jsx("button",{onClick:k,className:e.buttonLoad,children:"Load More"})})]})})};function io(){return o.jsx(so,{})}export{io as default};
