import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <header className="h-85vh">
      <div class="h-full flex items-center">
        <div className="px-270 w-full">
          <h2>Oil painter</h2>
          <h1>
           Katerine Elise <br />
          Art
          </h1>
        </div>
      </div>
    </header>

    <div class="h-85vh mr-64 bg-blue-500">

    </div>
  </Layout>
)

export default IndexPage
