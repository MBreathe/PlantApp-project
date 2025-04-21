export function renderAboutPage() {
  const element = document.createElement("div");
  element.className = "about-page display-flex";
  element.innerHTML = String.raw`
    <h1>about</h1>
    <div class="container">
      <p>Hi, my name is <em>Ilia</em>. I am a student at <em>HackYourFuture</em>. I love plants and everything nature related and I hate most of the plant apps I use, that’s whyI decided to build this web-application.</p>
      <p>You can read more about this project on my GitHub and if you want you can follow me on instagram (I haven’t posted in a while, but will get back to it very soon).</p>
      <p>Thank you for getting this far and hope you like the little projects that I have!</p>
    </div>
    <h1>some important links</h1>
    <div>
      <button>GitHub</button>
      <button>instagram</button>
      <button>HYF[HackYourFuture]</button>
      <button>perenualAPI</button>
    </div>
    <button>return to search</button>
    `;
  return element;
}
