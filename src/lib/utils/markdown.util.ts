/**
 *  @author Arron Hunt <arronjhunt@gmail.com>
 *  @copyright Copyright 2021. All rights reserved.
 *  @reference https://github.com/arronhunt/highlightjs-copy/issues/11
 */

export const addCopyButtonToHljs = ({ el, text }: { el: Element, text: string }) => {
  // Create the copy button and append it to the codeblock.
  const button = Object.assign(document.createElement("button"), {
    innerHTML: "Copy",
    className: "hljs-copy-button px-2 font-body text-sm",
  });
  button.dataset.copied = 'false';
  el.parentElement!.classList.add('hljs-copy-wrapper');
  el.parentElement!.appendChild(button);

  // Add a custom proprety to the code block so that the copy button can reference and match its background-color value.
  el.parentElement!.style.setProperty(
    "--hljs-theme-background",
    window.getComputedStyle(el).backgroundColor
  );
  el.parentElement!.style.setProperty(
    "--hljs-theme-color",
    window.getComputedStyle(el).color
  );

  button.onclick = function () {
    if (!navigator.clipboard) return;

    navigator.clipboard
      .writeText(text)
      .then(function () {

        button.innerHTML = "Copied!";
        button.dataset.copied = 'true';


        let alert: HTMLDivElement | null = Object.assign(document.createElement("div"), {
          role: "status",
          className: "hljs-copy-alert",
          innerHTML: "Copied to clipboard",
        });
        el.parentElement!.appendChild(alert);

        setTimeout(() => {
          if (alert) {
            button.innerHTML = "Copy";
            button.dataset.copied = "false";
            el.parentElement!.removeChild(alert);
            alert = null;
          }
        }, 2000);
      });
  };
}
