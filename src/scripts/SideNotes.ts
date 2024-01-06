export default class SideNotes {
  root: HTMLElement;
  notes: Map<string, [HTMLSpanElement, HTMLSpanElement]>;
  observer: IntersectionObserver;
  container: HTMLElement;

  constructor(root: HTMLElement, container?: HTMLElement) {
    this.root = root;
    this.notes = new Map();
    if (!container) {
      container = document.createElement("aside");
      container.classList.add("SideNotes");
      this.root.appendChild(container);
    }
    this.container = container;
    container.ariaLabel = "Margin Notes";
    // Create intersection observer for mobile
    this.observer = new IntersectionObserver(
      (e) =>
        e.forEach(({ isIntersecting, target }) => {
          const note = this.notes.get(target.id)?.[1];
          if (!note) return;
          if (isIntersecting) {
            note.classList.add("present");
          } else {
            note.classList.remove("present");
          }
        }),
      {
        rootMargin: "-100px 0px -20% 0px",
      },
    );
    window.addEventListener("resize", this.layoutNotes.bind(this));
  }

  begin() {
    const noteRoots = document.querySelectorAll<HTMLSpanElement>(
      "span[data-footnote-root]",
    );
    this.observer.disconnect();
    noteRoots.forEach((root) => {
      // Find this note's footnote, and move it into our container
      const note = root.querySelector<HTMLSpanElement>("[data-footnote]");
      if (!note) return;
      note.remove();
      this.container.appendChild(note);
      this.observer.observe(root);
      if (!this.notes.has(root.id)) {
        this.notes.set(root.id, [root, note]);
      }
    });

    this.layoutNotes();
  }

  layoutNotes() {
    if (window.innerWidth < 1200) return;
    let minTop = 0;
    const rootTop = this.root.getBoundingClientRect().top;
    for (const [, [root, note]] of this.notes) {
      const rootOffset = Math.max(
        minTop,
        root.getBoundingClientRect().top - rootTop,
      );
      note.style.top = `${rootOffset}px`;
      minTop = rootOffset + note.getBoundingClientRect().height + 8;
    }
  }
}
