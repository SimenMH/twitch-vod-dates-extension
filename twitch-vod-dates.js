const vodsLoadedObserver = new MutationObserver((mutations, observer) => {
  if (!chrome.runtime?.id) {
    vodsLoadedObserver.disconnect();
    return;
  }
  mutations.forEach(() => {
    const content = document.getElementsByClassName('home__lower-content');
    if (content.length > 0) {
      newVodObserver.observe(content[0], { childList: true, subtree: true });
      observer.disconnect();
    }
  });
});

const newVodObserver = new MutationObserver(() => {
  if (!chrome.runtime?.id) {
    newVodObserver.disconnect();
    return;
  }

  const vods = document.getElementsByClassName('jSrrlW ');

  if (vods.length > 0) {
    for (let i = 0; i < vods.length; i++) {
      const vod = vods[i];
      const daysAgoCard = vod.getElementsByClassName('kBbWhP');
      const thumbnail = vod.getElementsByClassName(
        'preview-card-thumbnail__image'
      );
      if (daysAgoCard.length > 0 && thumbnail.length > 0) {
        const daysAgoText = daysAgoCard[0].getElementsByClassName('bEHknf')[0];
        const vodDate =
          thumbnail[0].getElementsByClassName('tw-image')[0].title;
        if (daysAgoText.innerHTML != vodDate) {
          daysAgoText.innerHTML = vodDate;
        }
      }
    }
  }
});

// vodsLoadedObserver.observe(document.body, { childList: true });
newVodObserver.observe(document.body, { childList: true, subtree: true });
