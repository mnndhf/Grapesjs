var ful = 'fullscreen';
var prv = 'preview';
var codePanel = '';

function buildCodePanel(panel) {
  const codePanel = document.createElement('div');
  codePanel.classList.add('code-panel');

  const htmlSection = document.createElement('section');
  const cssSection = document.createElement('section');
  htmlSection.innerHTML = '<div>HTML</div>'
  cssSection.innerHTML = '<div>CSS</div>'

  const htmlCodeEditor = buildCodeEditor('html')
  const cssCodeEditor = buildCodeEditor('css')
  const htmlTextArea = document.createElement('textarea');
  const cssTextArea = document.createElement('textarea');
  htmlSection.appendChild(htmlTextArea);
  cssSection.appendChild(cssTextArea);

  codePanel.appendChild(htmlSection);
  codePanel.appendChild(cssSection);
  panel.set('appendContent', codePanel).trigger('change:appendContent');
  htmlCodeEditor.init(htmlTextArea);
  cssCodeEditor.init(cssTextArea);
  htmlCodeEditor.setContent(editor.getHtml());
  cssCodeEditor.setContent(editor.getCss({ avoidProtected: true }));

  // Split([htmlSection, cssSection], {
  //   direction: 'vertical',
  //   sizes: [50, 50],
  //   minSize: 100,
  //   gutterSize: 2,
  //   onDragEnd: () => {
  //     htmlCodeEditor.editor.refresh();
  //     cssCodeEditor.editor.refresh();
  //   }
  // });

  setupHtmlAutoUpdates(htmlCodeEditor);
  setupCssAutoUpdates(cssCodeEditor);

  // make sure editor is aware of width change after the 300ms effect ends
  setTimeout(() => {
    htmlCodeEditor.editor.refresh();
    cssCodeEditor.editor.refresh();
  }, 320)

  return codePanel
}

const editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    height: "300px",
    width: "auto",
    storageManager: { type: null },
    panels: { defaults: [] },

    showOffsets: 1,
    noticeOnUnload: false,
    fromElement: true,
    // panels: panels,


    blockManager: {
      appendTo: "#blocks",
      blocks: [
        {
          id: "column1",
          label: "1 Column",
          category: "Basic",
          attributes: { class: "gjs-fonts gjs-f-b1" },
          content: `<mj-section>
          <mj-column><mj-text> Content 1 </mj-text></mj-column>
        </mj-section>`
        },
        {
          id: "column2",
          label: "2 Column",
          category: "Basic",
          attributes: { class: "gjs-fonts gjs-f-b2" },
          content: `<mj-section>
          <mj-column><mj-text> Content 1 </mj-text></mj-column>
          <mj-column><mj-text> Content 2 </mj-text></mj-column>
        </mj-section>`
        },
        {
          id: "column3",
          label: "3 Column",
          category: "Basic",
          attributes: { class: "gjs-fonts gjs-f-b3" },
          content: `<mj-section>
          <mj-column><mj-text> Content 1 </mj-text></mj-column>
          <mj-column><mj-text> Content 2 </mj-text></mj-column>
          <mj-column><mj-text> Content 3 </mj-text></mj-column>
          </mj-section>`
        },
        {
          id: "text",
          label: "Text",
          category: "Basic",
          attributes: { class: "gjs-fonts gjs-f-text" },
          content: {
            type: "text",
            content: "Insert your text here",
            style: { padding: "10px" },
            activeOnRender: 1
          }
        },
        {
          id: "link",
          label: "Link",
          category: "Basic",
          attributes: { class: "fa fa-link" },
          content: {
            type: "link",
            content: "Link",
            style: { color: "red" }
          }
        },
        {
          id: "image",
          label: "Image",
          category: "Basic",
          select: true,
          activate: true,
          attributes: { class: "gjs-fonts gjs-f-image" },
          content: {
            style: { color: "black" },
            type: "image",
            activeOnRender: 1
          }
        },
        {
          id: "video",
          label: "Video",
          category: "Basic",
          attributes: { class: "fa fa-youtube-play" },
          select: true,
          activate: true,
          content: {
            type: "video",
            src: "img/video2.webm",
            style: { height: "200px", width: "200px" }
          }
        },
        {
          id: "map",
          label: "Map",
          category: "Basic",
          attributes: { class: "fa fa-map-o" },
          content: {
            type: "map",
            style: { height: "200px" }
          }
        },
        {
          id: "linkblock",
          label: "Link Block",
          category: "Basic",
          attributes: { class: "fa fa-link" },
          content: {
            type: "link",
            editable: false,
            droppable: true,
            style: {
              display: "inline-block",
              padding: "5px",
              "min-height": "50px",
              "min-width": "50px"
            }
          }
        },
        {
          id: "quote",
          label: "Quote",
          category: "Basic",
          attributes: { class: "fa fa-quote-right" },
          content: `<blockquote class="quote">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
          </blockquote>`
        },
        {
          id: "section",
          label: "Text Section",
          category: "Basic",
          attributes: { class: "gjs-fonts gjs-f-h1p" },
          content:
            '<section class="bdg-sect">\n <h1 class="heading">Insert title here</h1>\n <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>\n      </section>'
        },
        {
          id: "navbar",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"fill-rule="nonzero"></path>
          <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
          </svg>
          <div class="gjs-block-label">Navbar</div>`,
          category: "Extra",
          content: `
          <div class="navbarID" data-gjs-droppable="false" data-gjs-custom-name="labelnavbar" data-gjs="navbarRef">
            <div class="navbarID-container" data-gjs-droppable="false" data-gjs-draggable="false"
              data-gjs-removable="false" data-gjs-copyable="false" data-gjs-highlightable="false"
              data-gjs-custom-name="labelnavbarcontainer">
  
              <a href="/" class="navbarID-brand" data-gjs-droppable="true"></a>
  
              <div class="navbarID-burger" data-gjs-type="burger-menu">
                <div class="navbarID-burger-line" data-gjs-custom-name="labelBurgerLine" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="navbarID-burger-line" data-gjs-custom-name="labelBurgerLine" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="navbarID-burger-line" data-gjs-custom-name="labelBurgerLine" data-gjs-droppable="false" data-gjs-draggable="false"></div>
              </div>
  
              <div class="navbarID-items-c" data-gjs="navbarItemsRef" style="background-color:black; height:20px; margin-right:50px; padding-left:30px; font:20px;">
                <nav class="navbarID-menu" data-gjs="menuRef" data-gjs-custom-name="labelMenu">
                  <a href="#" class="navbarID-menu-link" data-gjs-custom-name="labelMenuLink" data-gjs-draggable="[data-gjs=menuRef]" style="color:white">Home</a>
                  <a href="#" class="navbarID-menu-link" data-gjs-custom-name="labelMenuLink" data-gjs-draggable="[data-gjs=menuRef]" style="margin-left:10px; color:white">About</a>
                  <a href="#" class="navbarID-menu-link" data-gjs-custom-name="abelMenuLink" data-gjs-draggable="[data-gjs=menuRef]" style="margin-left:10px; color:white">Contact</a>
                </nav>
              </div>
            </div>
          </div>
          `
        },
        {
          id: "countdown",
          label: "Countdown",
          category: "Extra",
          attributes: { class: "fa fa-clock-o" },
          content: `
          <div id="countdown">
          <div class="days" style="width:100px">Days</div>
          <div class="days" style="width:100px">Hours</div>
          <div class="days" style="width:100px">Minutes</div>
          <div class="days" style="width:100px">Second</div>
          </div>`
        },
        {
          id: "slider",
          label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d="M22 7.6c0-1-.5-1.6-1.3-1.6H3.4C2.5 6 2 6.7 2 7.6v9.8c0 1 .5 1.6 1.3 1.6h17.4c.8 0 1.3-.6 1.3-1.6V7.6zM21 18H3V7h18v11z" fill-rule="nonzero"></path>
          <path class="gjs-block-svg-path" d="M4 12.5L6 14v-3zM20 12.5L18 14v-3z"</path>
          </svg>
          <div class="gjs-block-label">Slider</div>`,
          category: "Extra",
          content:  `
           <div class="slide">
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" text-align="left" viewBox="0 0 501.5 501.5">
            <g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g>
           </svg>
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" text-align="right" viewBox="0 0 501.5 501.5">
            <g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g>
           </svg>
           </div>`,   
      },
        {
          id: "tabs",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
              <path d="M22 9.3c0-.8-.5-1.3-1.3-1.3H3.4C2.5 8 2 8.5 2 9.3v7.4c0 .8.5 1.3 1.3 1.3h17.4c.8 0 1.3-.5 1.3-1.3V9.3zM21 17H3V9h18v8z" fill-rule="nonzero"/><rect x="3" y="5" width="4" height="2" rx=".5"/><rect x="8" y="5" width="4" height="2" rx=".5"/><rect x="13" y="5" width="4" height="2" rx=".5"/>
            </g>
          </svg>
          <div class="gjs-block-label"> Tabs </div>
        `,
          category: "Extra",
          content:
            '\n      <nav data-tab-container>\n        <a href="#tab1" data-tab>Tab 1</a>\n        <a href="#tab2" data-tab>Tab 2</a>\n        <a href="#tab3" data-tab>Tab 3</a>\n      </nav>\n      <div id="tab1" data-tab-content>\n        <div>Tab 1 Content</div>\n      </div>\n      <div id="tab2" data-tab-content>\n        <div>Tab 2 Content</div>\n      </div>\n      <div id="tab3" data-tab-content>\n        <div>Tab 3 Content</div>\n      </div>\n    ',
          templateTabContent: "<div>New Tab Content</div>",
          style:
            "\n      .tab {\n        text-decoration: none;\n        color: inherit;\n        padding: 7px 14px;\n        transition: opacity 0.3s;\n        display: inline-block;\n        border-radius: 3px;\n        margin-right: 10px;\n      }\n\n      .tab.tab-active {\n        background-color: #0d94e6;\n        color: white;\n      }\n\n      .tab-content {\n        padding: 6px 12px;\n        min-height: 100px;\n        animation: fadeEffect 1s;\n      }\n\n      @keyframes fadeEffect {\n        from {opacity: 0;}\n        to {opacity: 1;}\n      }\n    "
        },
        {
          id: "tooltip",
          label: `<svg class="gjs-block-svg" viewBox = "0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d= "M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4z" fill-rule="nonzero"></path>
          </svg>
          <div class="gjs-block-label"> Tooltip </div>`,
          category: "Extra",
          content: {
            type: "tooltip",
            editable: false,
            droppable: true,
            style: {
              display: "inline-block",
              padding: "5px",
              "min-height": "50px",
              "min-width": "50px"
            }
          }
        },
        {
          id: "form",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd">
            <path class="gjs-block-svg-path" d="M22,5.5 C22,5.2 21.5,5 20.75,5 L3.25,5 C2.5,5 2,5.2 2,5.5 L2,8.5 C2,8.8 2.5,9 3.25,9 L20.75,9 C21.5,9 22,8.8 22,8.5 L22,5.5 Z M21,8 L3,8 L3,6 L21,6 L21,8 Z" fill-rule="nonzero"></path>
            <path class="gjs-block-svg-path" d="M22,10.5 C22,10.2 21.5,10 20.75,10 L3.25,10 C2.5,10 2,10.2 2,10.5 L2,13.5 C2,13.8 2.5,14 3.25,14 L20.75,14 C21.5,14 22,13.8 22,13.5 L22,10.5 Z M21,13 L3,13 L3,11 L21,11 L21,13 Z" fill-rule="nonzero"></path>
            <rect class="gjs-block-svg-path" x="2" y="15" width="10" height="3" rx="0.5"></rect>
          </g>
            </svg>
          <div class="gjs-block-label">Form</div>`,
          category: "Forms",
          content: `
          <form class="form">
          <div id="forms" style="padding-top:10px; padding-bottom:10px;">
            <div class="form-group" style="margin-left:10px;">
              <label class="label"> Name </label></br>
              <input placeholder= "Input your name" class="input" style="width:1000px; height:20px"/>
            </div></br>
            <div class="form-group" style="margin-left:10px">
              <label class="label"> Email </label></br>
              <input type="email" placeholder= "Input your email" class="input" style="width:1000px; height: 20px"/>
            </div></br>
            <div class="form-group" style="margin-left:10px">
              <label class="label"> Gender </label></br>
              <input type="checkbox" class="checkbox" value="M">
              <label class="checkbox-label"> M </label>
              <input type="checkbox" class="checkbox" value="F">
              <label class="checkbox-label"> F </label>
            </div></br>
            <div class="form-group" style="margin-left:10px">
              <label class="label"> Message </label></br>
              <textarea class="textarea" style="width:1000px; height:50px;"></textarea>
            </div></br>
            <div class="form-group" style="text-align:center; margin-left:10px;">
              <button type="submit" class="button" style="width:1000px; background-color:black; color:white; height:30px; font-size:15px"> Send </button>
            </div>
            </div>
          </form>
        `
        },
        {
          id: "input",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
            <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
          </svg>
          <div class="gjs-block-label">Input</div>`,
          category: "Forms",
          content: '<input class="input"/>'
        },
        {
          id: "textarea",
          label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d="M22,7.5 C22,6.6 21.5,6 20.75,6 L3.25,6 C2.5,6 2,6.6 2,7.5 L2,16.5 C2,17.4 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.4 22,16.5 L22,7.5 Z M21,17 L3,17 L3,7 L21,7 L21,17 Z"></path>
          <polygon class="gjs-block-svg-path" points="4 8 5 8 5 12 4 12"></polygon>
          <polygon class="gjs-block-svg-path" points="19 7 20 7 20 17 19 17"></polygon>
          <polygon class="gjs-block-svg-path" points="20 8 21 8 21 9 20 9"></polygon>
          <polygon class="gjs-block-svg-path" points="20 15 21 15 21 16 20 16"></polygon>
        </svg>
        <div class="gjs-block-label">Text Area</div>`,
          category: "Forms",
          content: '<textarea class="textarea"></textarea>'
        },
        {
          id: "select",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
            <polygon class="gjs-block-svg-path" transform="translate(18.500000, 12.000000) scale(1, -1) translate(-18.500000, -12.000000) " points="18.5 11 20 13 17 13"></polygon>
            <rect class="gjs-block-svg-path" x="4" y="11.5" width="11" height="1"></rect>
          </svg>
          <div class="gjs-block-label">Select</div>`,
          category: "Forms",
          content: `<select class="select"> Select </select>`
        },
        {
          id: "button",
          label: `
          <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
            <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
          </svg>
          <div class="gjs-block-label">Button</div>`,
          category: "Forms",
          content: '<button class="button"> Send </button>'
        },
        {
          id: "label",
          label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path class="gjs-block-svg-path" d="M22,11.875 C22,11.35 21.5,11 20.75,11 L3.25,11 C2.5,11 2,11.35 2,11.875 L2,17.125 C2,17.65 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.65 22,17.125 L22,11.875 Z M21,17 L3,17 L3,12 L21,12 L21,17 Z" fill-rule="nonzero"></path>
          <rect class="gjs-block-svg-path" x="2" y="5" width="14" height="5" rx="0.5"></rect>
          <polygon class="gjs-block-svg-path" fill-rule="nonzero" points="4 13 5 13 5 16 4 16"></polygon>
        </svg>
        <div class="gjs-block-label">Label</div>`,
          category: "Forms",
          content: '<label class="label"> Label </label>'
        },
        {
          id: "checkbox",
          label: "Checkbox",
          category: "Forms",
          attributes: { class: "fa fa-check-square" },
          content: '<input type="checkbox" class="checkbox"/>'
        },
        {
          id: "radio",
          label: "Radio",
          category: "Forms",
          attributes: { class: "fa fa-dot-circle-o" },
          content: '<input type="radio" class="radio"/>'
        }
      ]
    },
    layerManager: {
      appendTo: ".layers-container"
    },
    panels: {
      defaults: [
        {
          id: "layers",
          el: ".panel__right",
          resizable: {
            maxDim: 350,
            minDim: 200,
            tc: 0,
            cl: 1,
            cr: 0,
            bc: 0,
            keyWidth: "flex-basis"
          }
        }
      ]
    },
     panels:  {
      defaults: [
        {
          id: "panel-switcher",
          el: ".panel__switcher",
          buttons: [
            {
              id: "device-desktop",
              className: "fa fa-desktop",
              command: "set-device-desktop",
              active: true,
              togglable: false,
            },
            {
              id:"device-mobile",
              className: "fa fa-mobile",
              command: "set-device-mobile",
              togglable: false,
            },            
            {
              id: "show-layers",
              active: true,
              className: "fa fa-bars",
              command: "show-layers",
              // Once activated disable the possibility to turn it off
              togglable: false
            },
            {
              id: "show-style",
              active: true,
              className: "fa fa-paint-brush",
              command: "show-styles",
              togglable: false
            },
  
            {
              id: "show-blocks", 
              active: true,
              className: "fa fa-th-large",
              command: "show-blocks",
              togglable: false
            }, 
            {
              id: 'open-code',
              className: 'fa fa-edit',
              command: 'open-code',
              attributes: { title: 'Open Code'}
            }
          ]
        }
      ]
    },
    selectorManager: {
      appendTo: ".styles-container"
    },
    styleManager: {
      appendTo: ".styles-container",
      sectors: [
        {
          name: "General",
          open: false,
          buildProps: [
            "float",
            "display",
            "position",
            "top",
            "right",
            "left",
            "bottom"
          ]
        },
        {
          name: "Layout",
          open: false,
          buildProps: [
            "width",
            "height",
            "max-width",
            "min-height",
            "padding",
            "margin"
          ],
          properties: []
        },
        {
          name: "Typography",
          open: false,
          buildProps: [
            "font-family",
            "font-size",
            "font-weight",
            "letter-spacing",
            "color",
            "line-height",
            "text-align",
            "text-shadow"
          ],
          properties: [
            {
              property: "text-align",
              list: [
                { value: "left", className: "fa fa-align-left" },
                { value: "center", className: "fa fa-align-center" },
                { value: "right", className: "fa fa-align-right" },
                { value: "justify", className: "fa fa-align-justify" }
              ]
            }
          ]
        },
        {
          name: "Decoration",
          open: false,
          buildProps: [
            "border-radius-c",
            "background-color",
            "border-radius",
            "border",
            "box-shadow",
            "background"
          ]
        },
        {
          name: "Extra",
          open: false,
          buildProps: [
            "background-color",
            "box-shadow",
            "custom-prop",
            "transition",
            "perspective",
            "transform"
          ],
          properties: [
            {
              id: "custom-prop",
              name: "Custom Label",
              property: "font-size",
              type: "select",
              defaults: "32px",
              options: [
                { value: "12px", name: "Tiny" },
                { value: "18px", name: "Medium" },
                { value: "32px", name: "Big" }
              ]
            }
          ]
        }
      ]
    },
  
    storageManager: {
      type: "remote",
      autosave: false,
      stepsBeforeSave: 10,
      urlStore: "http://store/endpoint",
      urlLoad: "http://load/endpoint",
      params: {},
      headers: {}
    },
    commands: {
      defaults: [
        {
          id: "store-data",
          run(editor) {
            editor.store();
          }
        },
        {
            id: 'open-code',
            run: function(editor, senderBtn){
              const pn = editor.Panels;
              const id = 'panel__right';
              const panel = pn.getPanel(id) || pn.addPanel({id});
                if(!codePanel) {
                  codePanel = buildCodePanel(panel)
                };
              console.log(codePanel)

                codePanel.style.display = 'block';
                // editor.$('.panel__right').get(0).style.width = '35%';
                // editor.$('.gjs-cv-canvas').get(0).style.width = '65%';
            },
            stop: function(editor, senderBtn){
              // console.log('hai')
              if(codePanel) 
              codePanel.style.display = 'none';
              // editor.$('.panel__right').get(0).style.width = '15%';
              // editor.$('.gjs-cv-canvas').get(0).style.width= '85%';
            }
          },
      ]
    },
  
    deviceManager: {
      devices: [
        {
          name: "Desktop",
          width: ""
        },
        {
          name: "Mobile",
          width: "320px",
          widthMedia: "480px"
        }
      ]
    }
  });

  editor.Panels.addPanel({
    id: "panel-top",
    el: ".panel__top"
  });
  
  editor.Panels.addPanel({
    id: "basic-actions",
    el: ".panel__basic-actions",
    buttons: [
      {
        id: "visibility",
        active: true,
        className: "btn-toogle-borders",
        className: "fa fa-square-o",
        command: "sw-visibility"
      },
      {
        id: "export",
        className: "fa fa-code",
        command: "export-template",
        context: "export-template"
      },
      {
        id: "save",
        className: "btn-toogle-save",
        className: "fa fa-save",
        command: "save-template",
        context: "toogle-save"
      },
      {
       id: prv,
       className: 'fa fa-eye',
       command: prv,
       context: prv,
       attributes: { title: 'Preview' }
      },
      {
        id: ful,
        className: 'fa fa-arrows-alt',
        command: ful,
        context: ful,
        attributes: { title: 'Fullscreen' }
      },
      {
        id: "import",
        class: "btn-open-import",
        className: "fa fa-download",
        command: "import-template",
        context: "import-template"
      }
    ]
  });

  function buildCodeEditor(type) {
    var codeEditor = editor.CodeManager.getViewer('CodeMirror').clone();
    codeEditor.set({
      codeName: type === 'html' ? 'htmlmixed' : 'css',
      readOnly: false,
      theme: 'hopscotch',
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      smartIndent: true,
    });
    return codeEditor;
  }
  
  function setupHtmlAutoUpdates(htmlCodeEditor) {
    function update() {
      const htmlCode = htmlCodeEditor.editor.getValue()
      if (!htmlCode) return;
      editor.setComponents(htmlCode);
    }
    var delay;
    htmlCodeEditor.editor.on('change', function() {
      clearTimeout(delay);
      delay = setTimeout(update, 300);
    });
    // htmlCodeEditor.editor.refresh();
  }
  
  function setupCssAutoUpdates(cssCodeEditor) {
    function update() {
      const cssCode = cssCodeEditor.editor.getValue()
      if (!cssCode) return;
      editor.setStyle(cssCode);
    }
    var delay;
    cssCodeEditor.editor.on('change', function() {
      clearTimeout(delay);
      delay = setTimeout(update, 300);
    });
  }
  
  
  
  editor.on("run:export-template:before", (opts) => {
    console.log("Before the command run");
    if (0 /* some condition */) {
      opts.abort = 1;
    }
  });
  
  editor.on("run:export-template", () => {
    console.log("After the command run")
  });
  editor.on("abort:export-template", () => console.log("Command aborted"));

  editor.Commands.add("save-template", {
    run: editor => {
      var html = editor.getHtml()
      console.log(html)
      
      var css = editor.getCss()
      console.log(css)
    }
  });
  
  // Define commands
  editor.Commands.add("show-layers", {
    getRowEl(editor) {
      return editor.getContainer().closest(".editor-row");
    },
    getLayersEl(row) {
      return row.querySelector(".layers-container");
    },
  
    run(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "";
    },
    stop(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "none";
    }
  });
  
  editor.Commands.add("show-styles", {
    getRowEl(editor) {
      return editor.getContainer().closest(".editor-row");
    },
    getStyleEl(row) {
      return row.querySelector(".styles-container");
    },
  
    run(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "";
    },
    stop(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "none";
    }
  });
  
  editor.Commands.add("show-blocks", {
    getRowEl(editor) {
      return editor.getContainer().closest(".editor-row");
    },
    getBlocksEl(row) {
      return row.querySelector(".blocks-container");
    },
  
    run(editor, sender) {
      const smEl = this.getBlocksEl(this.getRowEl(editor));
      smEl.style.display = "";
    },
    stop(editor, sender) {
      const smEl = this.getBlocksEl(this.getRowEl(editor));
      smEl.style.display = "none";
    }
  });
  
  editor.Commands.add("show-styles", {
    getRowEl(editor) {
      return editor.getContainer().closest(".editor-row");
    },
    getStyleEl(row) {
      return row.querySelector(".styles-container");
    },
  
    run(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "";
    },
    stop(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "none";
    }
  });
  
  editor.Commands.add("set-device-desktop", {
    run: editor => editor.setDevice("Desktop")
  });
  
  editor.Commands.add("set-device-mobile", {
    run: editor => editor.setDevice("Mobile")
  });
  
  editor.on("change:device", () =>
    console.log("Current device: ", editor.getDevice())
  );
  
  