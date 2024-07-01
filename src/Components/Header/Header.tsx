import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img
        data-testid="logo-image"
        className={styles.logoImg}
        src="https://s3-alpha-sig.figma.com/img/4be6/2ff1/f5eaee5c071351079919edded6c6f953?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KnhKT5JPfCsFRWba3FXOeri7polIGChupeeTsDpQ7c95vb-o0HNBWhfQKh~d5ZnryxFS-F4~392Hg9O5umGUmRNQgws7ppzby~Ouus011tbYHgfOv4VQ16JRtUfyOfjfq5aXrZM6FaH96wDQ4ZqwWIYZw8ewnr9guXWSbcgoylNo5oIpCL9hPjTYtwY-~amgVmGJleVnQunHJNV~e8TANBlOsUTtFL67gKUHU92Wv~CpGN20uv6GdkeQitG-tLQpLC6iq8SXkxyDi8exzLyPTqJo~Tc83XbDVuVEUCMzfR8l7EGEJK-jMOFPEkYUjtO4qe-QIpYPbKyaqbrtQy4BrQ__"
        alt="Logo da Trybe"
      />
      <div className={styles.titleContainer}>
        <h1
          data-testid='header-title'
          className={styles.title}
        >
          Trybe News
        </h1>
      </div>
    </header>
  )
}

export default Header;