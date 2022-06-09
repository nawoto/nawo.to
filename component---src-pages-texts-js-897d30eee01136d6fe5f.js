"use strict";(self.webpackChunknawo_to=self.webpackChunknawo_to||[]).push([[993],{4505:function(e,t,a){a.d(t,{Z:function(){return d}});var l=a(7294),r=a(1597),n=function(e){var t=e.title;return l.createElement("header",null,l.createElement("div",{className:"hover-style py-6"},l.createElement("h3",{className:"text-center text-6xl font-black tracking-widest md:text-8xl"},l.createElement(r.Link,{to:"/"},t))),l.createElement("nav",null,l.createElement("ul",{className:"grid grid-cols-2 divide-x text-center text-lg uppercase md:grid-cols-4"},l.createElement("li",{className:"hover-style border-y"},l.createElement(r.Link,{to:"/"},"top")),l.createElement("li",{className:"hover-style border-y"},l.createElement(r.Link,{to:"/logs"},"log")),l.createElement("li",{className:"hover-style border-b md:border-y"},l.createElement(r.Link,{to:"/texts"},"texts")),l.createElement("li",{className:"hover-style border-b md:border-y"},l.createElement(r.Link,{to:"/about"},"about")))))},c=a(396),s=a(9519),m=a(8014),o=a(7190),i=function(){var e,t=null===(e=(0,r.useStaticQuery)("3257411868").site.siteMetadata)||void 0===e?void 0:e.author;return l.createElement("div",null,l.createElement("h3",{className:"hover-style border-y text-center text-2xl font-medium uppercase tracking-widest md:hidden"},"author"),l.createElement("div",{className:"hover-style h-card flex md:grid md:grid-cols-1"},l.createElement("div",{className:"border md:mx-auto md:border-none md:pt-1"},l.createElement(c.S,{className:"z-10 overflow-hidden rounded-full",imgClassName:"u-photo",layout:"fixed",formats:["auto","webp","avif"],src:"../images/profile-pic.png",width:138,height:138,quality:95,alt:"Profile picture",__imageData:a(1289)})),(null==t?void 0:t.name)&&l.createElement("div",{className:"w-full border-b p-1 md:text-center"},l.createElement("p",{className:"text-lg font-bold"},l.createElement(r.Link,{to:"/",className:"p-name u-url"},t.name)),l.createElement("p",{className:"text-sm md:px-10 md:text-left"},l.createElement("span",{className:"p-name"},"西村直人"),"。 おもに",l.createElement("span",{className:"p-nickname"},"nawoto")," という名前で",l.createElement("span",{className:"p-note"},"いろいろしています")),l.createElement("p",{className:"text-right text-sm md:text-center"},l.createElement(r.Link,{to:"/about",className:"uppercase underline"},"read me")),l.createElement("ul",{className:"flex flex-row justify-end pt-2 text-2xl md:justify-center"},l.createElement("li",{className:"hover-style px-2"},l.createElement("a",{href:"https://twitter.com/nawoto",className:"u-url",target:"_blank",rel:"noopener noreferrer"},l.createElement(s.G,{icon:o.mdU}))),l.createElement("li",{className:"hover-style px-2"},l.createElement("a",{href:"https://github.com/nawoto/",className:"u-url",target:"_blank",rel:"noopener noreferrer"},l.createElement(s.G,{icon:o.zhw}))),l.createElement("li",{className:"hover-style px-2"},l.createElement("a",{href:"https://speakerdeck.com/nawoto",className:"u-url",target:"_blank",rel:"noopener noreferrer"},l.createElement(s.G,{icon:o.Tzp}))),l.createElement("li",{className:"hover-style px-2"},l.createElement("a",{href:"https://www.instagram.com/nawoto/",className:"u-url",target:"_blank",rel:"noopener noreferrer"},l.createElement(s.G,{icon:o.Zzi}))),l.createElement("li",{className:"hover-style pl-2"},l.createElement(r.Link,{to:"/rss.xml"},l.createElement(s.G,{icon:m.mWX})))))))},d=function(e){var t=e.location,a=e.title,r=e.children,c="/"===t.pathname;return l.createElement("div",{"data-is-root-path":c},l.createElement(n,{title:a}),l.createElement("main",null,l.createElement("div",{className:"md:flex md:flex-row"},!c&&l.createElement("div",{className:"md:order-last md:basis-3/4"},r),l.createElement("div",{className:"border-r md:basis-1/4"},l.createElement(i,null)),c&&l.createElement("div",{className:"md:basis-3/4"},r))),l.createElement("footer",{className:"border-t text-center text-sm"},"© ",(new Date).getFullYear(),", NISHIMURA Naoto All Rights Reserved."))}},1014:function(e,t,a){a.r(t);var l=a(7294),r=a(1597),n=a(4505),c=a(4501);t.default=function(e){var t,a=e.data,s=e.location,m=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",o=a.allMarkdownRemark.nodes;return 0===o.length?l.createElement(n.Z,{location:s,title:m},l.createElement(c.Z,{title:"TEXTS | "+m}),l.createElement("p",null,"No contents found.")):l.createElement(n.Z,{location:s,title:m},l.createElement(c.Z,{title:"TEXTS | "+m}),l.createElement("div",{className:"hover-style py-4 text-center"},l.createElement("h1",{className:"text-4xl font-semibold uppercase tracking-widest"},"texts"),l.createElement("p",{className:"text-sm text-gray-500"},"不定期に思いついたことなどを文章にまとめています✍️")),l.createElement("ol",{style:{listStyle:"none"}},o.map((function(e){var t=e.frontmatter.title||e.fields.slug;return l.createElement("li",{key:e.fields.slug,className:"hover-style border-y border-solid py-2"},l.createElement("article",{className:"mx-auto w-5/6",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",{className:"py-4"},l.createElement("h2",{className:"text-2xl font-medium"},l.createElement(r.Link,{to:e.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},t))),l.createElement("small",null,e.frontmatter.date)),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}),l.createElement("div",{className:"my-2 border py-2 text-center uppercase"},l.createElement(r.Link,{to:e.fields.slug},"read more")))))}))))}},1289:function(e){e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#383838","images":{"fallback":{"src":"/static/22a97b9e3e1b207907eaae69036df7fb/2974b/profile-pic.png","srcSet":"/static/22a97b9e3e1b207907eaae69036df7fb/2974b/profile-pic.png 138w,\\n/static/22a97b9e3e1b207907eaae69036df7fb/8ef07/profile-pic.png 276w","sizes":"138px"},"sources":[{"srcSet":"/static/22a97b9e3e1b207907eaae69036df7fb/c7149/profile-pic.avif 138w,\\n/static/22a97b9e3e1b207907eaae69036df7fb/250ea/profile-pic.avif 276w","type":"image/avif","sizes":"138px"},{"srcSet":"/static/22a97b9e3e1b207907eaae69036df7fb/b50cf/profile-pic.webp 138w,\\n/static/22a97b9e3e1b207907eaae69036df7fb/508d5/profile-pic.webp 276w","type":"image/webp","sizes":"138px"}]},"width":138,"height":138}')}}]);
//# sourceMappingURL=component---src-pages-texts-js-897d30eee01136d6fe5f.js.map