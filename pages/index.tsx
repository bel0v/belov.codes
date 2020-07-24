import Head from "next/head";
import "./drawNoise";

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <canvas id="theCanvas">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <footer>
        <a href="mailto:yegor@belov.codes">yegor@belov.codes</a>
      </footer>
    </div>
  );
}

export default IndexPage;
