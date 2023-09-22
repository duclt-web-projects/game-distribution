<template>
  <footer>
    <div class="wrapper">
      <article>
        <div class="footer-left">
          <img src="/images/logos/logo-white.png" alt="XGame logo" class="m-auto mb-5"/>
          <p>
            XGame offers a free service for developers and publishers. We help game developers monetize and distribute
            their games. We offer publishers a wide range of high quality cross platform games.
          </p>
          <p>
            <a
              href="https://www.google.nl/maps/place/OrangeGames/@52.2789942,4.7433615,17z/data=!3m1!4b1!4m5!3m4!1s0x47c60c686089387b:0x58146d40b5c1a299!8m2!3d52.2789942!4d4.7455502"
              target="_blank"
              title="Location of our office"
              >The Nine, 9 Pham Van Dong, Mai Dich, Cau Giay, Ha Noi
            </a>
          </p>
        </div>
        <div class="footer-right">
          <div class="info">
            <small>Information</small>
            <a href="/games" target="_self" title="Games">About Us</a>
            <a href="/games" target="_self" title="Games">Games</a>
            <a href="/games" target="_self" title="Publishers">Publishers</a>
            <a href="/games" target="_self" title="Developers">Developers</a>
            <a href="/games" target="_self" title="SDK">SDK</a>
            <a href="/games" target="_blank" title="Blog">Blog</a>
          </div>
          <div class="contact">
            <small>Support</small>
            <a href="/games" target="_self" title="Contact Us">Contact Us</a>
            <a href="/games" title="FAQ">FAQ</a>
          </div>
        </div>
        <div class="copyright">
          <p>
            XGame Copyright 2023 |
            <a
              href="https://static.gamedistribution.com/policy/privacy-enduser.html"
              target="_blank"
              title="Privacy policy"
              >Privacy policy</a
            >
            -
            <a
              href="https://static.gamedistribution.com/policy/privacy-platform.html"
              target="_blank"
              title="Platform Privacy policy"
              >Platform Privacy policy</a
            >
            -
            <a href="https://static.gamedistribution.com/terms/both.html" target="_blank" title="Terms &amp; conditions"
              >Terms &amp; conditions</a
            >
          </p>
        </div>
      </article>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
  background: linear-gradient(90deg, #1b3786, #24b3c0);
  color: #fff;

  article {
    font-size: 14px;
    padding: 2.5em 0.313em;
    text-align: center;

    p {
      padding: 0.625em;
    }
  }

  .xg-button {
    border-bottom: 0;
    margin-top: 1em;
    padding: 0.6em 1.2em !important;
  }

  .contactus-image {
    margin-left: 1.5%;
    width: 35%;
  }

  .footer-left {
    p {
      margin: 0 0 1rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    img {
      width: 80%;
    }

    a {
      color: currentColor;
      display: block;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &:active {
        color: #44a5ab;
      }

      &:first-of-type {
        margin-top: 0.75em;
      }
    }

    br {
      display: none;
    }
  }

  .footer-right {
    small {
      border-bottom: 1px solid #b7f9ff;
      color: currentColor;
      display: inline;
      font-size: 1.75em;
      padding: 0.15em 0.1em 0.2em;
      text-shadow: 0 0.07em 0 rgba(0, 0, 0, 0.5);
      text-transform: uppercase;
      width: 100%;
    }

    span {
      display: block;

      &:first-of-type {
        margin-top: 0.75em;
      }
    }

    a {
      color: currentColor;
      display: block;

      &:hover {
        text-decoration: underline;
      }

      &:active {
        color: #b7f9ff;
      }

      &:first-of-type {
        margin-top: 0.75em;
      }
    }

    .info {
      font-weight: 700;
      margin-bottom: 2.5em;
      margin-top: 1.25em;

      li:before {
        color: currentColor;
        content: "-";
      }
    }

    .contact {
      font-weight: 700;
      margin-bottom: 2.5em;
      margin-top: 1.25em;

      small {
        width: 220px;
      }

      a {
        color: #fff;
        display: block;

        &:hover {
          text-decoration: underline;
        }

        &:active {
          color: #b7f9ff;
        }

        &:first-of-type {
          margin-top: 0;
        }
      }

      p {
        padding: 0;
      }
    }
  }

  .copyright {
    color: currentColor;

    a {
      color: currentColor;

      &:hover {
        text-decoration: underline;
      }

      &:active {
        color: #b7f9ff;
      }
    }

    p {
      margin-bottom: 0;
    }
  }
}

@media (min-width: 640px) {
  footer {
    article {
      p {
        padding: 0;
      }
    }

    .contactus-image {
      margin-top: 50px;
      width: 40%;
    }

    .footer-left {
      img {
        max-width: 250px;
      }

      a {
        &:first-of-type {
          margin-bottom: 1.25em;
        }
      }
    }

    .footer-right {
      display: flex;
      margin-top: 40px;

      span {
        &:first-of-type {
          margin-top: 0;
        }
      }

      a {
        &:first-of-type {
          margin-top: 1.25em;
        }
      }

      .info {
        flex: 1;
        margin-bottom: 1.25em;
        margin-right: 5em;
        margin-top: 0;
        order: 1;
      }

      .contact {
        flex: 1;
        margin-bottom: 1.25em;
        margin-top: 0;
        order: 2;

        a {
          &:first-of-type {
            margin-top: 0;
          }
        }
      }
    }
  }
}

@media (min-width: 750px) {
  footer {
    .contactus-image {
      margin-left: 30%;
      margin-top: 50px;
    }
  }
}

@media (min-width: 1366px) {
  footer {
    article {
      display: flex;
      flex: 1;
      flex-flow: row wrap;
      padding: 4.375em 1.563em;
      text-align: left;
    }

    .contactus-image {
      margin-left: 30%;
      margin-top: 0;
      width: 70%;
    }

    .footer-left {
      flex: 1;
      order: 1;
      padding: 0 2.5em 0 0;

      a {
        &:first-of-type {
          margin-top: 0;

          br {
            display: block;
          }
        }
      }

      br {
        display: block;
      }
    }

    .footer-right {
      flex: 1;
      order: 2;
      padding: 0 0 0 2.5em;

      small {
        display: inline-block;
        margin-bottom: 1.25em;
      }

      a {
        :first-of-type {
          margin-top: 0;
        }
      }

      .contact {
        a {
          margin-bottom: 0;

          &:first-of-type {
            margin-top: inherit;
          }
        }
      }
    }

    .copyright {
      flex: 1 100%;
      order: 3;
      text-align: center;
    }
  }
}
</style>
