class Controls {
  constructor(type) {
    this.forward = false;
    this.right = false;
    this.left = false;
    this.reverse = false;
    
    switch (type){
      case "KEYS":
        this.#addInputs()
        break;
      case "DUMMY":
        this.forward = true
        break;
    }
  }

  #addInputs() {
    // Menambahkan event listener untuk tombol "forward"
    document.getElementById('tombolForward').addEventListener('touchstart', () => {
      this.forward = true;
    });

    document.getElementById('tombolForward').addEventListener('touchend', () => {
      this.forward = false;
    });

    // Menambahkan event listener untuk tombol "reverse"
    document.getElementById('tombolReverse').addEventListener('touchstart', () => {
      this.reverse = true;
    });

    document.getElementById('tombolReverse').addEventListener('touchend', () => {
      this.reverse = false;
    });

    // Menambahkan event listener untuk tombol "left"
    document.getElementById('tombolLeft').addEventListener('touchstart', () => {
      this.left = true;
    });

    document.getElementById('tombolLeft').addEventListener('touchend', () => {
      this.left = false;
    });

    // Menambahkan event listener untuk tombol "right"
    document.getElementById('tombolRight').addEventListener('touchstart', () => {
      this.right = true;
    });

    document.getElementById('tombolRight').addEventListener('touchend', () => {
      this.right = false;
    });
  }
}

