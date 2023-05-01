// @ts-nocheck
import $ from "jquery";

import { FaChevronUp } from "react-icons/fa";
import "./totop.scss";

export const ToTopBtn = () => {
  return (
    <a id="back-top" href="#top">
      <FaChevronUp />
    </a>
  );
};

$(document).ready(function () {
  $("h1, p").delay("1000").fadeIn();

  $("#back-top").hide();

  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $("#back-top").fadeIn();
      } else {
        $("#back-top").fadeOut();
      }
    });

    $("a#back-top").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        800
      );
      return false;
    });
  });
});
