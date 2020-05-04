new Vue({
  el: '.container',
  data() {
    return {
      title: 'Εργαλείο Διάσπασης IP',
      data_size: null,
      mtu: null,
      header_length: null,
      fragments: [],
    };
  },
  methods: {
    calculate: function() {
      const payloadOffsetOctets = parseInt((this.mtu - this.header_length*4)/8);
      const payloadOffsetBytes = payloadOffsetOctets * 8;
      const fragmentNum = parseInt((this.data_size / payloadOffsetBytes) + 1);

      const fragments = [];
      let tableRows = '';

      let count = fragmentNum;
      for (let i = 0; i < fragmentNum; i++) {
        fragments.push({
          check: 'check',
          df: 0,
          mf: 1,
          size: this.mtu - this.header_length,
          header: this.header_length * 4,
          final_size: this.mtu,
          pointer: i * payloadOffsetOctets,
        });

        count = count - 1;
        if (count == 0) {
          tableRows = tableRows + `
                    <tr>
                    <td>${i + 1 +'ο'}</td>
                    <td>${this.data_size}</td>
                    <td>${0}</td>
                    <td>${0}</td>
                    <td>${(this.data_size - i * payloadOffsetBytes) - 20}</td>
                    <td>${this.header_length * 4}</td>
                    <td>${this.data_size - i * payloadOffsetBytes}</td>
                    <td>${i * payloadOffsetOctets}</td>
                    </tr>
                    `;
        } else {
          tableRows = tableRows + `
                    <tr>
                    <td>${i + 1 +'ο'}</td>
                    <td>${this.data_size}</td>
                    <td>${0}</td>
                    <td>${1}</td>
                    <td>${this.mtu - this.header_length * 4}</td>
                    <td>${this.header_length * 4}</td>
                    <td>${this.mtu}</td>
                    <td>${i * payloadOffsetOctets}</td>
                    </tr>
                    `;
        }
      }

      document.getElementById('table_body').innerHTML = tableRows;

      console.log(this.data_size, this.mtu, this.header_length);
      console.log(payloadOffsetOctets);
      console.log(payloadOffsetBytes);
      console.log(fragmentNum);
      fragments.forEach((item, i) => {
        console.log(item);
      });
    },
    checkInput: function() {
      if (!this.data_size || !this.mtu || !this.header_length) {
        document.getElementById('btn').disabled = true;
        console.log(0);
      } else {
        console.log(1);
        document.getElementById('btn').disabled = false;
      }
    },
  },
});
