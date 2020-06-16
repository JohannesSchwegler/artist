import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"
import { gsap, TweenLite, TimelineMax, Power4, Expo } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

function Header({ siteTitle }) {
  useEffect(() => {
    var html = document.documentElement
    var body = document.body
    console.log(document.querySelector(".scroll-container"))
    var scroller = {
      target: document.querySelector(".scroll-container"),
      ease: 0.07, // <= scroll speed
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0,
    }

    var requestId = null

    TweenLite.set(scroller.target, {
      rotation: 0.01,
      force3D: true,
    })

    window.addEventListener("load", onLoad)

    function onLoad() {
      updateScroller()
      window.focus()
      window.addEventListener("resize", onResize)
      document.addEventListener("scroll", onScroll)
    }

    function updateScroller() {
      var resized = scroller.resizeRequest > 0

      if (resized) {
        var height = scroller.target.clientHeight
        body.style.height = height + "px"
        scroller.resizeRequest = 0
      }

      var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0

      scroller.endY = scrollY
      scroller.y += (scrollY - scroller.y) * scroller.ease

      if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY
        scroller.scrollRequest = 0
      }

      TweenLite.set(scroller.target, {
        y: -scroller.y,
      })

      requestId =
        scroller.scrollRequest > 0
          ? requestAnimationFrame(updateScroller)
          : null
    }

    function onScroll() {
      scroller.scrollRequest++
      if (!requestId) {
        requestId = requestAnimationFrame(updateScroller)
      }
    }

    function onResize() {
      scroller.resizeRequest++
      if (!requestId) {
        requestId = requestAnimationFrame(updateScroller)
      }
    }
  }, [])

  const transitionLength = 0.6

  /*   function interestingEntryAnimation(exit, node) {
    window.scrollTo(0, 0)
    let tl = new TimelineMax()
    tl.from(node, transitionLength, { opacity: 0 })

    
  }
  function interestingExitAnimation(exit, node) {
    let tl = new TimelineMax()
    tl.to(node, transitionLength, { opacity: 0 })
    
  } */

  function interestingEntryAnimation(exit, node) {
    window.scrollTo(0, 0)
    let tl = new TimelineMax()

    tl.fromTo(node, 0.6, { opacity: 0 }, { opacity: 1 })
  }
  function interestingExitAnimation(exit, node) {
    let tl = new TimelineMax()

    let body = ".kk-menu-content-backdrop"
    console.log(body)
    tl.fromTo(
      body,
      0.8,
      { scaleX: 1 },
      { scaleX: 6, ease: Expo.easeOut, clearProps: "all" }
    )
  }

  const background = useRef(null)
  let isMenuOpen = false

  function handlePageTransition() {}

  function handleMenu() {
    let tl = new TimelineMax()
    console.log(background.current)
    if (!isMenuOpen) {
      tl.to(".kk-menu-content", 1.3, { x: 0, ease: Expo.easeOut })
      tl.fromTo(background.current, 1, { opacity: 0 }, { opacity: 0.7 }, 0)
      isMenuOpen = !isMenuOpen
    } else {
      tl.to(".kk-menu-content", 0.9, { x: "100%", ease: Expo.easeOut })
      tl.fromTo(
        background.current,
        1,
        { opacity: 0.7 },
        { opacity: 0, clearProps: "all" },
        0
      )
      isMenuOpen = !isMenuOpen
    }

    /*  value: function() {
      var t = new yo.timeline({
          paused: !0
      });
      return t.fromTo(this.backdrop, {
          opacity: 0
      }, {
          opacity: 1,
          duration: .7
      }, 0),
      t.fromTo(this.content, {
          backgroundColor: "#efefef",
          x: "100%"
      }, {
          backgroundColor: "#ffffff",
          x: "0%",
          ease: "expo.out",
          duration: 1.3
      }, 0),
      t.fromTo(this.grids, {
          x: "-35%"
      }, {
          x: "0%",
          ease: "expo.out",
          duration: 1.3
      }, 0),
      t.fromTo(this.grids, {
          opacity: 0
      }, {
          opacity: 1,
          duration: .6
      }, .2), */
    console.log("test")
  }
  return (
    <>
      <header className="kk-menu">
        <div className="kk-menu-container">
          <div className="kk-menu-logo">
            <Link
              className="text-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              to="/"
            >
              Katerine
            </Link>
          </div>

          <div className="kk-menu-burger">
            <button onClick={handleMenu} className="h-4 cursor-pointer">
              <span className="kk-menu-burger-text">menu</span>

              <span className="kk-menu-burger-icon">
                <span className="inline-block w-full h-1 bg-black"></span>
                <span className="inline-block mt-1 w-full h-1 bg-black"></span>
              </span>
            </button>
          </div>
        </div>

        <div className="kk-menu-box">
          <div ref={background} className="kk-menu-background"></div>
          <div className="kk-menu-content">
            <div class="kk-menu-content-backdrop"></div>
            <div class="kk-menu-body">
              <div class="kk-menu-container-inner">
                <ul className="kk-menu-list">
                  <li className="text-6xl mr-3">
                    <TransitionLink
                      className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                      activeClassName="inline-block py-2 px-4 text-black font-bold no-underline"
                      to="/about"
                      exit={{
                        trigger: ({ exit, node }) =>
                          interestingExitAnimation(exit, node),
                        length: transitionLength,
                      }}
                      entry={{
                        trigger: ({ entry, node }) =>
                          interestingEntryAnimation(entry, node),
                        length: transitionLength,
                        delay: transitionLength,
                      }}
                    >
                      About
                    </TransitionLink>
                  </li>
                  <li className="text-6xl mr-3">
                    <TransitionLink
                      className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                      activeClassName="inline-block py-2 px-4 text-black font-bold no-underline"
                      to="/work"
                      exit={{
                        trigger: ({ exit, node }) =>
                          interestingExitAnimation(exit, node),
                        length: transitionLength,
                      }}
                      entry={{
                        trigger: ({ entry, node }) =>
                          interestingEntryAnimation(entry, node),
                        length: transitionLength,
                        delay: transitionLength,
                      }}
                    >
                      Work
                    </TransitionLink>
                  </li>
                  <li className="text-6xl mr-3">
                    <TransitionLink
                      className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                      activeClassName="inline-block py-2 px-4 text-black font-bold no-underline"
                      to="/photography"
                      exit={{
                        trigger: ({ exit, node }) =>
                          interestingExitAnimation(exit, node),
                        length: transitionLength,
                      }}
                      entry={{
                        trigger: ({ entry, node }) =>
                          interestingEntryAnimation(entry, node),
                        length: transitionLength,
                        delay: transitionLength,
                      }}
                    >
                      Photographyk
                    </TransitionLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
