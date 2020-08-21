class Folder {
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    Object.assign(this, folder)
    Folder.folderNavigatorElement.append(this.folderIcon)
  }

  get folderIcon() {
    const icon = new Dominator(Templates.folderIcon(this))
    const div = icon.domElement
    div.addEventListener('click', this.goToFolder.bind(this))
    return div
  }

  goToFolder() {
    const docNavigatorElement = Folder.generateCollectionView('folder-' + this.id + '-docs', this.id)
    folderAdapter.getFolderById(this.id)
      .then((json) => {
        for (const doc of json.docs) {
          const newDoc = new Doc(doc)
          docNavigatorElement.append(newDoc.docIcon)
        }
        controls.innerHTML = ''
        controls.append(this.controls)
        main.replaceChild(docNavigatorElement, Folder.folderNavigatorElement)
      })
  }

  static controls(name = 'Folders') {
    const controls = new Dominator(Templates.navigatorControls({name: name}))
    return controls.domElement
  }

  get controls() {
    const foldersControls = Folder.controls(this.name)
    return foldersControls
  }

  static showAllFolders() {
    controls.innerHTML = ''
    controls.append(Folder.controls())
    main.replaceChild(Folder.folderNavigatorElement, main.firstChild)
  }

  static generateCollectionView(id, folderId) {
    const div = document.createElement('div')
    div.classList.add('collection')
    div.id = id
    const newIcon = document.createElement('div')
    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-plus')
    const wrapper = document.createElement('div')
    wrapper.append(icon, name)
    newIcon.append(wrapper)
    if (folderId) {
      newIcon.classList.add('folder-icon', 'new-doc-icon')
      //handle new doc
      // newIcon.addEventListener('click', )
    } else {
      newIcon.classList.add('folder-icon', 'new-doc-icon')
      //handle new folder
      // newIcon.addEventListener('click', )
    }
    div.prepend(newIcon)

    return div
  }
}
