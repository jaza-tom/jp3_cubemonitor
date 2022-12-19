/*!
 * module electron
 * Copyright(c) 2021 STMicroelectronics
 */

let updateMenu = _ => {

  const hamburger = document.querySelector("#red-ui-header-button-sidemenu-submenu");
  // wait for hamburger menu to be present in DOM
  if (hamburger !== null) {
    // Add dashboard button before hamburger menu 
    const ul = document.querySelector("#red-ui-header>ul.red-ui-header-toolbar");
    const li = document.createElement("li");
    li.innerHTML = String.raw`<span class="button-group"><a id="stm32cubemonitor-dashboard-button" href="/ui" target="_blank">
    <span><i class="fa fa-external-link"></i>  DASHBOARD</span>
    </a></span>`;
    ul.appendChild(li);
    ul.insertBefore(li, hamburger.parentNode);

    // Create hamburger menu entries  
    const myItems = String.raw`
    <li class="red-ui-menu-divider"></li>
    <li id="open-dialog">
      <a tabindex="-1" href="#">
        <div class="red-ui-menu-label">About ${about.productName}</div>
      </a>
    </li>
    <li class="red-ui-menu-dropdown-submenu pull-left">
      <a tabindex="-1" href="#">
        <span class="red-ui-menu-label">Help</span>
      </a>
      <ul class="red-ui-menu-dropdown">
      <li>
        <a tabindex="-1" href="https://community.st.com/s/topic/0TO0X000000x33lWAA/stm32cubemonitor" target="_blank">
          <span class="red-ui-menu-label">ST Community</span>
        </a>
      </li>
      <li>
        <a tabindex="-1" href="https://wiki.st.com/stm32mcu/wiki/STM32CubeMonitor:STM32CubeMonitor_overview" target="_blank">
          <span class="red-ui-menu-label" > Wiki </span>
        </a>
      </li>
      </ul>
    </li>
    `;
    hamburger.insertAdjacentHTML('beforeend', myItems.trim());
    // add click listener to open dialog panel on about entry
    document.querySelector("#open-dialog").addEventListener("click", _ => {
      $("#about-dialog").dialog("open");
    });

    // Create dialog popup window
    const aboutDialog = $('<div id="about-dialog" class="hide" style="text-align:center;"></div>')
      .appendTo("body")
      .dialog({
        modal: true,
        autoOpen: false,
        width: 450,
        resizable: false,
        title: "About " + about.productName,
        buttons: [
          {
            id: "about-dialog-close",
            text: "Close",
            click: function () {
              $(this).dialog("close");
            }
          }
        ],
        open: function (e) {
        },
        close: function (e) {
        }
      });
    aboutDialog.append($(
      '<img style="height:100px;" src="theme/header/CubeMonitorTitleHigh.jpg">' +
      '<h5>version ' + about.version + '</h5>' +
      '<h5>Copyright @ 2021' + about.copyright + '</h5>'
    ));

  } else {
    setTimeout(updateMenu, 100);
  }
}
updateMenu();
let about = {
    productName:"STM32CubeMonitor",
    version:"1.5.0",
    copyright:"STMicroelectronics"
};