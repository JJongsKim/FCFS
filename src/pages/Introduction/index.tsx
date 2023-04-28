import styles from './Introduction.module.scss';

const Introduction = () => {
  const nextLine = `\n`;
  return (
    <div className={styles.introPageWrap}>
      <div className={styles.blueBack} />
      <div className={styles.grayBack} />
      <div className={styles.introContainer}>
        <section id={styles.firstSection}>
          <p>원하는 서비스를 구독하거나,</p>
          <p>원데이 클래스를 수강하고 싶은데,</p>
          <p>취향과 마음이 맞는 사람을 구하고 싶다면?</p>
          <p id={styles.emphasisText}>우리 선착순 서비스를 이용해보세요!</p>
        </section>
        <section id={styles.secondSection}>
          <p>✔️</p>
          <p>관심있는 카테고리에 들어가 어떤 글이 있는지 둘러보세요!</p>
          <p>✔️</p>
          <p>나도 글을 쓰고 싶다면?{nextLine}마음껏 선착순 글 작성을 해보세요!</p>
          <p>✔️</p>
          <p>글을 올려 마음이 맞는 사람들을 구해보세요!</p>
        </section>
        <section id={styles.lastSection}>
          <div>
            <p>선착순 개발자</p>
            <p>김수정, 유용빈, 최민지</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
