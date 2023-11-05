import styles from "./Home.module.css";

function Homepg() {
  return (
    <div className={styles.right}>
      <img id={styles.notesimg} src="./assests/notes.png" alt="" />
      <div className={styles.aboutnotesapp}>
        <header className={styles.heading}>Pocket Notes</header>

        <div className={styles.about}>
          <p>Send and receive messages without keeping your phone online.</p>
          <p> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
      </div>
      <footer id={styles.footertext}>
        <img id={styles.lock} src="./assests/vector.png" alt="" />
        end-to-end encrypted
      </footer>
    </div>
  );
}
export default Homepg;
