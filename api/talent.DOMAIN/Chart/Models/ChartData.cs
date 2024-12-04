using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models 
{
    public class ChartData 
    {
        public List<string> Labels { get; set; }
        public List<Dataset> Datasets { get; set; }
    }
}
