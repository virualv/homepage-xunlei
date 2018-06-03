import './libs/fullpage.js/jquery.fullpage.min.css'
import './libs/fullpage.js/jquery.fullpage.min.js'

import './scss/style.scss'

$(document).ready(function () {
  $('#wrapper').fullpage({
    // Navigation
    lockAnchors: true,
    anchors: ['pg1', 'pg2', 'pg3', 'pg4', 'pg5'],
    // Scrolling
    loopBottom: true,
    // Design
    controlArrows: false,
    verticalCentered: false,
    fixedElements: '#header, #nav',
    // Custom selectors
    sectionSelector: '.page_box',
    slideSelector: '.slide_box',
    // events
    onLeave: function (idx, nextIdx, dir) {
      $('#nav > a').removeClass('cur')
      $(`#nav > a:eq(${nextIdx - 1})`).addClass('cur')
    }
  })

  $('#moreBtn').mouseenter(_ => { $('#moreMenu').css('right', 0) })
  $('#moreWrap').mouseleave(_ => { $('#moreMenu').css('right', '-163px') })

  $('#nav').mouseover(function (ev) {
    if (ev.target !== ev.currentTarget && !$(ev.target).hasClass('cur')) {
      $('#nav > a').removeClass('cur')
      $(ev.target).addClass('cur')
      $.fn.fullpage.moveTo(ev.target.dataset.menuanchor)
    }
  })

  $('#slideMenu').mouseover(function (ev) {
    if (ev.target !== ev.currentTarget && !$(ev.target).hasClass('cur')) {
      // 菜单
      $('#slideMenu > a').removeClass('cur')
      $(ev.target).addClass('cur')
      // 内容
      $('.slide').removeClass('show')
      $(`.slide[data-id="${$(ev.target).data('anchor')}"]`).addClass('show')
    }
  })
})
